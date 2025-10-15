import { TokenAuthentication } from '@api/infra/adapters/auth/token-auth.adapter'
import { Cache } from '@api/infra/adapters/cache/cache.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { UserAuth } from '@api/infra/facades/user-auth.dto'

type ListSectionsUsecaseOutput = Array<{
  userId: string
  email: string
}>

export class ListSectionsUsecase {
  @inject('Cache')
  private readonly Cache!: Cache

  @inject('TokenAuthentication')
  private readonly TokenAuthentication!: TokenAuthentication

  async execute(): Promise<ListSectionsUsecaseOutput> {
    const sections = this.Cache.getMany<{ token: string }>('auth:')
    const activeSections = sections.map((section) => {
      const { id, email } = this.TokenAuthentication.decode<UserAuth>(section.token)
      return {
        userId: id,
        email: email
      }
    })
    return activeSections
  }
}
