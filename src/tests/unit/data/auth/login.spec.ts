import { ok } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { Login } from '../../../../app/data/useCases/auth/login'
import { LoginUc } from '../../../../app/domain/useCases/auth/login'
import env from '../../../../env'
import { loginResponseMock } from '../../../utils/mocks/auth/login-response--mock'
import { userEntityMock } from '../../../utils/mocks/user/user-entity-mock'
import { BcryptStub } from '../../../utils/stubs/bcrypt-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { JwtStub } from '../../../utils/stubs/jwt-stub'
import { FindUserRepositoryStub } from '../../../utils/stubs/repositories/user/find-user-repository-stub'

interface LoginCredentials {
  email: string,
  password: string
}

interface SutTypes {
  sut: LoginUc
  i18nStub: Internationalization
  findUserRepositoryStub: FindUserRepositoryStub,
  loginCredentials: LoginCredentials
}

const makeSut = async (): Promise<SutTypes> => {
  const i18nStub = new I18nStub()
  const bcryptStub = new BcryptStub()
  const jwtStub = new JwtStub()
  const jwtConfig = {
    key: env.security.JWT_KEY,
    expiresIn: env.security.JWT_EXPIRES_IN
  }
  const findUserRepositoryStub = new FindUserRepositoryStub()
  const userMock = await userEntityMock
  const loginCredentials: LoginCredentials = {
    email: userMock.email,
    password: userMock.password
  }
  const sut = new Login(
    i18nStub,
    bcryptStub,
    jwtStub,
    jwtConfig,
    findUserRepositoryStub
  )
  return {
    sut,
    i18nStub,
    findUserRepositoryStub,
    loginCredentials
  }
}

describe('Login', () => {
  test('Should return 200 if the login was executed successfully', async () => {
    const { sut, i18nStub, findUserRepositoryStub, loginCredentials } = await makeSut()
    await jest.spyOn(findUserRepositoryStub, 'findOne').mockImplementation(async () => await userEntityMock)
    const res = await sut.exec(loginCredentials.email, loginCredentials.password)
    expect(res).toEqual(ok(i18nStub.t('LOGIN_SUCCESSFUL'), await loginResponseMock))
  })
})
