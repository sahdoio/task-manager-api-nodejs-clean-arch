import env from '../../../../env'
import { LoginController } from '../../../presentation/controllers/auth/login'
import { Login } from '../../../data/useCases/auth/login'
import { JsonWebToken } from '../../../implementations/encrypters/jwt'
import { I18n } from '../../../implementations/internationalization/i18n'
import { PersonalFieldValidator } from '../../../implementations/helpers/validate-fields'
import { DbFindUserRepository } from '../../../implementations/repositories/user/db-find-user-repository'
import { Bcrypt } from '../../../implementations/encrypters/bcrypt'
import { SequelizeORM } from '../../../implementations/database/sequelize'

export const makeLoginController = (): LoginController => {
  const dbORM = SequelizeORM.getInstance()
  const findUserRepository = new DbFindUserRepository(dbORM)
  const bcrypt = new Bcrypt()
  const jsonWebToken = new JsonWebToken()
  const i18n = new I18n()
  const jwtConfig = {
    key: env.security.JWT_KEY,
    expiresIn: env.security.JWT_EXPIRES_IN
  }
  const loginUc = new Login(
    i18n,
    bcrypt,
    jsonWebToken,
    jwtConfig,
    findUserRepository
  )
  const validator = new PersonalFieldValidator()
  const loginController = new LoginController(validator, loginUc)
  return loginController
}
