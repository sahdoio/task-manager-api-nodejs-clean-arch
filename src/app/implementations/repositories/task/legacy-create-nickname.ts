import { getConnection, QueryRunner } from 'typeorm'
import { CreateNicknameRepository, CreateNicknameRepositoryDto } from '../../../../data/protocols/repositories/nickname/create-nickname'
import { NicknameEntity } from '../../../../domain/entities/Nickname'
import { DbRepository } from '../../repository'
import { Nickname } from '../../database/entities/Nickname'

export class LegacyCreateNicknameRepository extends DbRepository implements CreateNicknameRepository {
  async exec (data: CreateNicknameRepositoryDto, transaction?: QueryRunner): Promise<NicknameEntity> {
    const repo = transaction ? transaction.manager.getRepository(Nickname) : getConnection().getRepository(Nickname)
    const { accountId, userId } = data
    data.account = { id: accountId }
    data.user = { id: userId }
    const nickname = await repo.save(data)
    return nickname
  }
}
