import { FindUserRepository } from '../../../data/protocols/repositories/user/find-user-repository'
import { PaginatedResult } from '../../../data/protocols/repositories/repository'
import { UserEntity } from '../../../domain/entities/User'
import { UcOptions } from '../../../domain/protocols/uc-options'
import { FindUserDto } from '../../../domain/useCases/user/find-user'
import { DbRepository } from '../repository'
import { User } from '../../database/entities/User'

export class DbFindUserRepository extends DbRepository implements FindUserRepository {
  constructor() {
    super()
    super.entity = User
  }

  async findAll(data: FindUserDto, opts?: UcOptions): Promise<PaginatedResult<UserEntity[]>> {
    await this.startConnection()
    const userRepository = await this.dbORM.getRepository(User)
    return await userRepository.findAll()
  }

  async findOne(data: FindUserDto, opts?: UcOptions): Promise<UserEntity> {
    await this.startConnection()
    const userRepository = await this.dbORM.getRepository(User)
    return await userRepository.findOne(data)
  }
}
