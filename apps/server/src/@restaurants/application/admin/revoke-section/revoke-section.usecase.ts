import { ONE_DAY } from '@api/domain/consts/timeouts.const'
import { Cache } from '@api/infra/adapters/cache/cache.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { RevokeSectionType } from '@restaurants/application/admin/revoke-section/revoke-section.schema'

export class RevokeSectionUsecase {
  @inject('Cache')
  private readonly Cache!: Cache

  async execute({ userId }: RevokeSectionType): Promise<void> {
    const sections = this.Cache.getMany<{ token: string }>(`auth:${userId}`)
    const tokens = sections.map((section) => section.token)
    const revokedTokens = this.Cache.get<string[]>('revoked_tokens') || []
    this.Cache.set('revoked_tokens', [...revokedTokens, ...tokens], ONE_DAY)
    this.Cache.delete(`auth:${userId}`)
  }
}
