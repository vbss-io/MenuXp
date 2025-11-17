import { ONE_DAY } from '@api/domain/consts/timeouts.const'
import { NotFoundError } from '@api/domain/errors'
import { TokenAuthentication } from '@api/infra/adapters/auth/token-auth.adapter'
import { Cache } from '@api/infra/adapters/cache/cache.adapter'
import { Mailer } from '@api/infra/adapters/mailer/mailer.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { UserRegisteredData } from '@restaurants/domain/auth/events/user-registered.event'
import { EmailConfirmationTemplate } from '@restaurants/domain/auth/mailer/email-confirmation.template'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type UserRegisteredListenerInput = UserRegisteredData

export class UserRegisteredListener {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('TokenAuthentication')
  private readonly TokenAuthentication!: TokenAuthentication

  @inject('Cache')
  private readonly Cache!: Cache

  @inject('Mailer')
  private readonly Mailer!: Mailer

  async execute({ name, email }: UserRegisteredListenerInput): Promise<void> {
    const user = await this.UserRepository.findOne({ email })
    if (!user) throw new NotFoundError('User', email)
    const token = this.TokenAuthentication.encode(user.getAuth())
    this.Cache.set(`auth:${user.id}`, { token }, ONE_DAY)
    const confirmationUrl = `${process.env.ADM_URL}/verify-email?token=${token}`
    const content = {
      subject: 'Confirme seu Email',
      text: 'Por favor, confirme seu endereço de email clicando no link neste email.'
    }
    const html = EmailConfirmationTemplate.render({
      name,
      confirmationUrl
    })
    await this.Mailer.sendMail(email, content.subject, content.text, html)
  }
}
