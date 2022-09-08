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
  protected dbORM: any
  protected defaultItemsPerPage = env.paginatedResult.defaultItemsPerPage
  protected defaultCurrentPage = env.paginatedResult.defaultCurrentPage

  constructor() { }

  // async validateUniques (data: any, uniqueFields: string[], id?: number, transaction?: QueryRunner): Promise<string[]> {
  //   const uniqueViolations = []

  //   // Find repo
  //   const repo = transaction ? transaction.manager.getRepository(this.entity) : getRepository(this.entity)

  //   // Create unique where
  //   const uniqueWhere = []
  //   for (const uniqueField of uniqueFields) {
  //     uniqueWhere.push({
  //       [uniqueField]: data[uniqueField]
  //     })
  //   }

  //   // Check unique
  //   const obj = await repo.findOne({ where: uniqueWhere }) as any
  //   if (!obj || (id && String(obj.id) === String(id))) {
  //     return []
  //   }

  //   for (const uniqueField of uniqueFields) {
  //     /* istanbul ignore else */
  //     if (obj[uniqueField] === data[uniqueField]) {
  //       uniqueViolations.push(uniqueField)
  //     }
  //   }

  //   return uniqueViolations
  // }

  // async setupPagination (queryBuilder: SelectQueryBuilder<any>, opts?: UcOptions): Promise<RepositoryMetadata> {
  //   const total = await queryBuilder.getCount()
  //   const itemsPerPage = opts?.itemsPerPage || this.defaultItemsPerPage
  //   const currentPage = opts?.currentPage || this.defaultCurrentPage

  //   queryBuilder.offset(itemsPerPage * (currentPage - 1))
  //   queryBuilder.limit(itemsPerPage)

  //   if (opts?.isOrderByDesc) {
  //     opts.isOrderByDesc = stringToBoolean(opts.isOrderByDesc)
  //   }

  //   if (opts?.orderBy) {
  //     if (Array.isArray(opts.orderBy) && opts.orderBy.length) {
  //       queryBuilder.orderBy(opts.orderBy[0], opts?.isOrderByDesc ? 'DESC' : 'ASC')
  //       for (let i = 1; i < opts.orderBy.length; i++) {
  //         queryBuilder.addOrderBy(opts.orderBy[i], opts?.isOrderByDesc ? 'DESC' : 'ASC')
  //       }
  //     } else {
  //       queryBuilder.orderBy(opts.orderBy.toString(), opts?.isOrderByDesc ? 'DESC' : 'ASC')
  //     }
  //   }

  //   return {
  //     totalOfRegisters: total,
  //     totalOfPages: Math.ceil(total / itemsPerPage),
  //     itemsPerPage: itemsPerPage,
  //     currentPage: currentPage
  //   }
  // }

  async startConnection(): Promise<void> {
    if (!this.dbORM) {
      console.log('[startConnection] starting connection')

      this.dbORM = new Sequelize({
        database: env.database.NAME,
        dialect: 'postgres',
        username: env.database.USERNAME,
        password: env.database.PASSWORD,
        host: env.database.HOST,
        port: parseInt(env.database.PORT),
        models: [__dirname + '/../database/entities'],
        repositoryMode: true
      })
    } 
  }

  async testConnection(): Promise<void> {
    if (!this.dbORM) {
      await this.startConnection()
    }
    try {
      await this.dbORM.authenticate();
      console.log('[testConnection] Connection has been established successfully.')
    } catch (error) {
      console.error('[testConnection] Unable to connect to the database:', error)
    }
  }
}
