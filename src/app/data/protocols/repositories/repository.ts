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
  setupPagination (payload: any[], opts?: UcOptions): Promise<RepositoryMetadata>
}
