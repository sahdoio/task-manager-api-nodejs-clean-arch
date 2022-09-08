import { SelectQueryBuilder } from 'typeorm'
import { Repository, RepositoryMetadata } from '../../../../app/data/protocols/repositories/repository'
import { UcOptions } from '../../../../app/domain/protocols/uc-options'
import { repositoryMetadataMock } from '../../mocks/repository-metadata'

export class DbRepositoryStub implements Repository {
  async validateUniques (data: any, uniqueFields: string[], transaction?: any): Promise<string[]> {
    return []
  }

  async setupPagination (queryBuilder: SelectQueryBuilder<any>, opts?: UcOptions): Promise<RepositoryMetadata> {
    return repositoryMetadataMock
  }
}
