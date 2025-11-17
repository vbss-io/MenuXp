import { ONE_DAY } from '@api/domain/consts/timeouts.const'
import { NotFoundError } from '@api/domain/errors'
import { TokenAuthentication } from '@api/infra/adapters/auth/token-auth.adapter'
import { Cache } from '@api/infra/adapters/cache/cache.adapter'
import { Mailer } from '@api/infra/adapters/mailer/mailer.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { ResetPasswordRequestedData } from '@restaurants/domain/auth/events/reset-password-requested.event'
import { ResetPasswordTemplate } from '@restaurants/domain/auth/mailer/reset-password.template'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type ResetPasswordRequestedListenerInput = ResetPasswordRequestedData

export class ResetPasswordRequestedListener {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('TokenAuthentication')
  private readonly TokenAuthentication!: TokenAuthentication

  @inject('Cache')
  private readonly Cache!: Cache

  @inject('Mailer')
  private readonly Mailer!: Mailer

  async execute({ email }: ResetPasswordRequestedListenerInput): Promise<void> {
    const user = await this.UserRepository.findOne({ email })
    if (!user) throw new NotFoundError('User', email)
    const token = this.TokenAuthentication.encode(user.getAuth())
    this.Cache.set(`auth:${user.id}`, { token }, ONE_DAY)
    const resetUrl = `${process.env.ADM_URL}/reset-password?token=${token}`
    const content = {
      subject: 'Redefinir sua Senha',
      text: 'Recebemos uma solicitação para redefinir sua senha. Clique no link neste email para criar uma nova senha.'
    }
    const html = ResetPasswordTemplate.render({
      name: user.name,
      resetUrl
    })
    await this.Mailer.sendMail(email, content.subject, content.text, html)
  }
}
