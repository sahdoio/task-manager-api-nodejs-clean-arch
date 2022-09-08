import { getConnection, QueryRunner, SelectQueryBuilder } from 'typeorm'
import { DbRepository } from '../../repository'
import { PaginatedResult } from '../../../../data/protocols/repositories/repository'
import { UcOptions } from '../../../../domain/protocols/uc-options'
import { FindNicknameRepository, FindNicknameRepositoryDto } from '../../../../data/protocols/repositories/nickname/find-nickname'
import { NicknameEntity } from '../../../../domain/entities/Nickname'
import { Nickname } from '../../database/entities/Nickname'

export class LegacyFindNicknameRepository extends DbRepository implements FindNicknameRepository {
  async findAll (data: FindNicknameRepositoryDto, transaction?: QueryRunner, opts?: UcOptions): Promise<PaginatedResult<NicknameEntity[]>> {
    const queryBuilder = this.getQueryBuilder(data, transaction)
    const metadata = await this.setupPagination(queryBuilder, opts)
    const payload = await queryBuilder.getMany()

    return { payload, metadata }
  }

  async findOne (data: FindNicknameRepositoryDto, transaction?: QueryRunner): Promise<NicknameEntity> {
    const queryBuilder = this.getQueryBuilder(data, transaction)
    const payload = await queryBuilder.getOne()
    return payload
  }

  private getQueryBuilder (data: FindNicknameRepositoryDto, transaction?: QueryRunner): SelectQueryBuilder<Nickname> {
    const repo = transaction ? transaction.manager.getRepository(Nickname) : getConnection().getRepository(Nickname)
    const { userId, accountId } = data

    const queryBuilder = repo.createQueryBuilder('Nickname')
      .innerJoinAndSelect('Nickname.account', 'Account')
      .innerJoinAndSelect('Nickname.user', 'User')
      .where('Nickname.userId = :userId', { userId })

    if (accountId) {
      queryBuilder.andWhere('Nickname.accountId = :accountId', { accountId })
    }

    return queryBuilder
  }
}
