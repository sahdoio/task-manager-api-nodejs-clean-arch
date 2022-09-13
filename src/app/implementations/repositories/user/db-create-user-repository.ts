import { UserEntity } from '../../../domain/entities/User'
import { FindUserDto } from '../../../domain/useCases/user/find-user'
import { DbRepository } from '../repository'
import { User } from '../../database/entities/User'
import { ISequelizeORM } from '../../../data/protocols/utils/sequelize'
import { CreateUserRepository } from '../../../data/protocols/repositories/user/create-user-repository'

export class DbCreateUserRepository extends DbRepository implements CreateUserRepository {
  constructor(
    protected dbORM: ISequelizeORM
  ) {
    super()
    super.entity = User
  }

  async exec(data: FindUserDto): Promise<UserEntity> {
    const dbORMClient = await this.dbORM.getClient()
    const userRepository = await dbORMClient.getRepository(User)
    const user = await userRepository.create(data)
    return user
  }
}
