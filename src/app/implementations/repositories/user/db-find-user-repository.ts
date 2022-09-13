import { FindUserRepository } from '../../../data/protocols/repositories/user/find-user-repository'
import { PaginatedResult } from '../../../data/protocols/repositories/repository'
import { UserEntity } from '../../../domain/entities/User'
import { UcOptions } from '../../../domain/protocols/uc-options'
import { FindUserDto } from '../../../domain/useCases/user/find-user'
import { DbRepository } from '../repository'
import { User } from '../../database/entities/User'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'

export class DbFindUserRepository extends DbRepository implements FindUserRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    super.entity = User
  }

  async findAll(data: FindUserDto, opts?: UcOptions): Promise<PaginatedResult<UserEntity[]>> {
    const dbORMClient = await this.dbORM.getClient()
    const userRepository = await dbORMClient.getRepository(User)
    const payload = await userRepository.findAll({ where: { ...data }})
    const metadata = await this.setupPagination(payload, opts)
    return { payload, metadata }
  }

  async findOne(data: FindUserDto, opts?: UcOptions): Promise<UserEntity> {
    const dbORMClient = await this.dbORM.getClient()
    const userRepository = await dbORMClient.getRepository(User)
    const payload = await userRepository.findOne({ where: { ...data }})
    return payload
  }
}
