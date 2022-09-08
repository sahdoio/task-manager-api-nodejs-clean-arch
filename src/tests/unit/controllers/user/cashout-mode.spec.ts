import { FieldValidator } from '../../../../app/data/protocols/utils/field-validator'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { CashOutModeUc } from '../../../../app/domain/useCases/user/cashout-mode'
import { CashOutModeController } from '../../../../app/presentation/controllers/user/cashout-mode'
import { serverError } from '../../../../app/presentation/helpers/http'
import { HttpRequest } from '../../../../app/presentation/protocols/http'
import { makeHttpRequestMock } from '../../../utils/mocks/http-request'
import { cashOutModeMockEnabled } from '../../../utils/mocks/user/cashout-mode'
import { CashOutModeUcStub } from '../../../utils/stubs/controllers/user/cashout-mode'
import { FieldValidatorStub } from '../../../utils/stubs/field-validator-stub'
import { I18nStub } from '../../../utils/stubs/i18n-stub'

interface SutTypes {
  sut: CashOutModeController
  data: HttpRequest
  uc: CashOutModeUc
  i18nStub: Internationalization
  personalValidatorStub: FieldValidator
}

const makeSut = (): SutTypes => {
  const i18nStub = new I18nStub()
  const uc = new CashOutModeUcStub()
  const personalValidatorStub = new FieldValidatorStub()
  const sut = new CashOutModeController(personalValidatorStub, uc)
  const data = makeHttpRequestMock({
    body: {
      enabled: true
    },
    currentUser: {
      currentWalletId: 1
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

describe('CashOutModeController', () => {
  test('Should return serverError if something throws an error', async () => {
    const { sut, data, uc } = makeSut()
    jest.spyOn(uc, 'exec').mockImplementationOnce(async () => {
      throw new Error('server error.')
    })
    const res = await sut.handle(data)
    expect(res).toEqual(serverError())
  })

  test('Should return Ok if all data is correct', async () => {
    const { sut, data, i18nStub } = makeSut()
    const res = await sut.handle(data)
    expect(res.statusCode).toBe(200)
    expect(res.body.msg).toBe(i18nStub.t('CASHOUT_MODE_ENABLED_SUCCESSFULLY'))
    expect(res.body.data).toEqual(cashOutModeMockEnabled)
  })
})
