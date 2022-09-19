import { FieldValidator } from '../../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { CreateUserUc } from '../../../../app/domain/useCases/user/create-user'
import { CreateUserController } from '../../../../app/presentation/controllers/user/create-user'
import { HttpRequest } from '../../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../../utils/mocks/http-request'
import { userEntityMock } from '../../../utils/mocks/user/user-entity-mock'
import { CreateUserUcStub } from '../../../utils/stubs/controllers/user/create-user'
import { FieldValidatorStub } from '../../../utils/stubs/field-validator-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'

interface SutTypes {
  sut: CreateUserController
  data: HttpRequest
  uc: CreateUserUc
  i18nStub: Internationalization
  personalValidatorStub: FieldValidator
}

const makeSut = (): SutTypes => {
  const i18nStub = new I18nStub()
  const uc = new CreateUserUcStub()
  const personalValidatorStub = new FieldValidatorStub()
  const sut = new CreateUserController(personalValidatorStub, uc)
  const data = makeHttpRequestMock({
    body: {
      userEntityMock
    }
  })

  return {
    sut,
    data,
    i18nStub,
    uc,
    personalValidatorStub
  }
}

describe('CreateUserController', () => {
  test('Should return Ok if all data is correct', async () => {
    const { sut, data, i18nStub } = makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18nStub.t('CREATE_USER_SUCCESSFUL'))
  })
})
