import { CreateNicknameRepository, CreateNicknameRepositoryDto } from '../../../../../app/data/protocols/repositories/nickname/create-nickname'
import { NicknameEntity } from '../../../../../app/domain/entities/Nickname'
import { nicknameEntityMock } from '../../../mocks/nickname-entity'
import { DbRepositoryStub } from '../db-repository-stub'

export class CreateNicknameRepositoryStub extends DbRepositoryStub implements CreateNicknameRepository {
  async exec (data: CreateNicknameRepositoryDto, transaction?: any): Promise<NicknameEntity> {
    return nicknameEntityMock
  }
}
