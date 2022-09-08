import { UcOptions } from '../../../domain/protocols/uc-options'

export interface RepositoryMetadata {
  totalOfRegisters?: number
  totalOfPages?: number
  currentPage?: number
  itemsPerPage?: number
}

export interface PaginatedResult<T> {
  payload: T
  metadata: RepositoryMetadata
}

export interface Repository {
  testConnection: () => Promise<void>
  // validateUniques: (data: any, uniqueFields: string[], transaction?: any) => Promise<string[]>
  // setupPagination: (queryBuilder: SelectQueryBuilder<any>, opts?: UcOptions) => Promise<RepositoryMetadata>
}
