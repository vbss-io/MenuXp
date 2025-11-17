import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetComboType } from '@restaurants/application/combos/get-combo/get-combo.schema'
import { Combo } from '@restaurants/domain/combos/combo.entity'
import { ComboRepository } from '@restaurants/infra/repositories/combo.repository'

export class GetComboUsecase {
  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

  async execute({ comboId }: GetComboType): Promise<Combo> {
    const combo = await this.ComboRepository.findById(comboId)
    if (!combo) throw new NotFoundError('Combo', comboId)
    // TODO: add category name and medias
    return combo
  }
}
