import { Repository, RepositoryMetadata } from '../../../../app/data/protocols/repositories/repository'
import { UcOptions } from '../../../../app/domain/protocols/uc-options'
import { repositoryMetadataMock } from '../../mocks/repository-metadata'

export class DbRepositoryStub implements Repository {
  async setupPagination (payload: any[], opts?: UcOptions): Promise<RepositoryMetadata> {
    return repositoryMetadataMock
  }
}
