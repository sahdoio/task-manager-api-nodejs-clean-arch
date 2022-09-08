import { FindNicknameRepository, FindNicknameRepositoryDto } from '../../../../../app/data/protocols/repositories/nickname/find-nickname'
import { PaginatedResult } from '../../../../../app/data/protocols/repositories/repository'
import { NicknameEntity } from '../../../../../app/domain/entities/Nickname'
import { UcOptions } from '../../../../../app/domain/protocols/uc-options'
import { nicknameEntityMock } from '../../../mocks/nickname-entity'
import { repositoryMetadataMock } from '../../../mocks/repository-metadata'
import { DbRepositoryStub } from '../db-repository-stub'

export class FindNicknameRepositoryStub extends DbRepositoryStub implements FindNicknameRepository {
  async findAll (data: FindNicknameRepositoryDto, transaction?: any, opts?: UcOptions): Promise<PaginatedResult<NicknameEntity[]>> {
    return {
      metadata: repositoryMetadataMock,
      payload: [nicknameEntityMock]
    }
  }

  async findOne (data: FindNicknameRepositoryDto, transaction?: any): Promise<NicknameEntity> {
    return nicknameEntityMock
  }
}
