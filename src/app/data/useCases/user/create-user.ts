import { UserEntity } from '../../../domain/entities/User'
import { Result } from '../../../domain/protocols/result'
import { CreateUserDto, CreateUserUc } from '../../../domain/useCases/user/create-user'
import { ok, unprocessableEntity } from '../../helpers/result'
import { CreateUserRepository } from '../../protocols/repositories/user/create-user-repository'
import { FindUserRepository } from '../../protocols/repositories/user/find-user-repository'
import { Internationalization } from '../../protocols/utils/internationalization'

export class CreateUser implements CreateUserUc {
  constructor (
    private readonly i18n: Internationalization,
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserRepository: FindUserRepository
  ) { }

  async exec (data: CreateUserDto): Promise<Result<UserEntity>> {
    const { email, phoneNumber } = data
    let existingAccount = await this.findUserRepository.findOne({ email })
    if (existingAccount) {
      return unprocessableEntity(this.i18n.t('ERROR_EXISTING_USER'))
    }
    existingAccount = await this.findUserRepository.findOne({ phoneNumber })
    if (existingAccount) {
      return unprocessableEntity(this.i18n.t('ERROR_EXISTING_USER'))
    }
    const result = await this.createUserRepository.exec(data)
    return ok(this.i18n.t('CREATE_USER_SUCCESSFUL'), result)
  }
}
