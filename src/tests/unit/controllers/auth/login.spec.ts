import { FieldValidator } from '../../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { LoginUc } from '../../../../app/domain/useCases/auth/login'
import { LoginController } from '../../../../app/presentation/controllers/auth/login'
import { HttpRequest } from '../../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../../utils/mocks/http-request'
import { userEntityMock } from '../../../utils/mocks/user/user-entity-mock'
import { LoginUcStub } from '../../../utils/stubs/controllers/auth/login'
import { FieldValidatorStub } from '../../../utils/stubs/field-validator-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'

interface SutTypes {
  sut: LoginController
  data: HttpRequest
  uc: LoginUc
  i18nStub: Internationalization
  personalValidatorStub: FieldValidator
}

const makeSut = (): SutTypes => {
  const i18nStub = new I18nStub()
  const uc = new LoginUcStub()
  const personalValidatorStub = new FieldValidatorStub()
  const sut = new LoginController(personalValidatorStub, uc)
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

describe('LoginController', () => {
  test('Should return Ok if login was executed successfully', async () => {
    const { sut, data, i18nStub } = makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18nStub.t('LOGIN_SUCCESSFUL'))
  })
})
