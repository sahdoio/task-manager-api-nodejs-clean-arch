import { getConnection, QueryRunner } from 'typeorm'
import { DeleteNicknameRepository } from '../../../../data/protocols/repositories/nickname/delete-nickname'
import { DbRepository } from '../../repository'
import { Nickname } from '../../database/entities/Nickname'

export class LegacyDeleteNicknameRepository extends DbRepository implements DeleteNicknameRepository {
  async delete (nicknameId: number, transaction?: QueryRunner): Promise<void> {
    const repo = transaction ? transaction.manager.getRepository(Nickname) : getConnection().getRepository(Nickname)
    await repo.createQueryBuilder('Nickname')
      .where('Nickname.id = :nicknameId', { nicknameId })
      .softDelete()
      .execute()
  }
}
