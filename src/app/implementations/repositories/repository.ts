/* istanbul ignore file */
/*
  This file is ignored by test because many repositories uses the validateUnique method, but JEST don't count this on its coverage, but this file is already tested by another test cases.
  Also, this is a abstract class, thus, it's not possible instantiate it for unit tests
*/
import env from '../../../env'
import { Repository, RepositoryMetadata } from '../../data/protocols/repositories/repository'
import { UcOptions } from '../../domain/protocols/uc-options'
import { stringToBoolean } from '../../presentation/helpers/normalizeFields'
import { Sequelize } from 'sequelize-typescript'

export abstract class DbRepository implements Repository {
  protected entity: any
  protected defaultItemsPerPage = env.paginatedResult.defaultItemsPerPage
  protected defaultCurrentPage = env.paginatedResult.defaultCurrentPage

  constructor() { }

  async setupPagination (payload: any[], opts?: UcOptions): Promise<RepositoryMetadata> {
    const total = payload.length
    const itemsPerPage = opts?.itemsPerPage || this.defaultItemsPerPage
    const currentPage = opts?.currentPage || this.defaultCurrentPage

    return {
      totalOfRegisters: total,
      totalOfPages: Math.ceil(total / itemsPerPage),
      itemsPerPage: itemsPerPage,
      currentPage: currentPage
    }
  }  
}
