import { ok } from '../../../../app/data/helpers/result'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { CreateUser } from '../../../../app/data/useCases/user/create-user'
import { CreateUserDto } from '../../../../app/domain/useCases/user/create-user'
import { userEntityMock } from '../../../utils/mocks/user/user-entity-mock'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { CreateUserRepositoryStub } from '../../../utils/stubs/repositories/user/create-user-repository-stub'
import { FindUserRepositoryStub } from '../../../utils/stubs/repositories/user/find-user-repository-stub'

interface SutTypes {
  sut: CreateUser
  i18nStub: Internationalization
  createUserRepositoryStub: CreateUserRepositoryStub
  createUserRepositoryDto: CreateUserDto,
  findUserRepositoryStub: FindUserRepositoryStub
}

const makeSut = (): SutTypes => {
  const createUserRepositoryDto = {
    "email": "create_user_unit_test@test.com",
    "firstName": "User",
    "lastName": "Unit Test",
    "phoneNumber": "9999999999",
    "password": "123456"
  }
  const i18nStub = new I18nStub()
  const findUserRepositoryStub = new FindUserRepositoryStub()
  const createUserRepositoryStub = new CreateUserRepositoryStub()
  const sut = new CreateUser(
    i18nStub,
    createUserRepositoryStub,
    findUserRepositoryStub
  )
  return {
    sut,
    i18nStub,
    createUserRepositoryStub,
    createUserRepositoryDto,
    findUserRepositoryStub
  }
}

describe('CreateUser', () => {
  test('Should return 200 if the user creation was executed successfully', async () => {
    const { sut, i18nStub, createUserRepositoryDto, findUserRepositoryStub } = makeSut()
    jest.spyOn(findUserRepositoryStub, 'findOne').mockImplementation(() => null)
    const res = await sut.exec(createUserRepositoryDto)
    expect(res).toEqual(ok(i18nStub.t('CREATE_USER_SUCCESSFUL'), await userEntityMock))
  })
})
