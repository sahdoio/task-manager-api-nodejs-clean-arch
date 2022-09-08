import { ok } from '../../../../app/data/helpers/result'
import { TransactionManager } from '../../../../app/data/protocols/repositories/transaction'
import { UpdateWalletRepoDto, UpdateWalletRepository } from '../../../../app/data/protocols/repositories/wallet/update-wallet-repository'
import { CreateWalletCashOutModeLogRepository } from '../../../../app/data/protocols/repositories/walletCashOutModeLog/create-wallet-cashout-mode-log-repository'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { CashOutMode } from '../../../../app/data/useCases/user/cashout-mode'
import { CashOutModeUc } from '../../../../app/domain/useCases/user/cashout-mode'
import { cashOutModeMockEnabled, cashOutModeMockDisabled } from '../../../utils/mocks/user/cashout-mode'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { UpdateWalletRepositoryStub } from '../../../utils/stubs/repositories/wallet/update-wallet-repository-stub'
import { CreateWalletCashOutModeLogRepositoryStub } from '../../../utils/stubs/repositories/walletCashOutModeLog/create-wallet-cashout-mode-log-repository-stub'
import { TransactionStub } from '../../../utils/stubs/transaction-stub'

interface SutTypes {
  sut: CashOutModeUc
  i18nStub: Internationalization
  transactionManagerStub: TransactionManager
  walletId: number
  updateWalletRepositoryDto: UpdateWalletRepoDto
  updateWalletRepositoryStub: UpdateWalletRepository
  createWalletCashOutModeLogRepositoryStub: CreateWalletCashOutModeLogRepository
}

const makeSut = (): SutTypes => {
  const walletId: number = 1
  const updateWalletRepositoryDto: UpdateWalletRepoDto = {
    cashOutModeEnabled: true
  }
  const i18nStub = new I18nStub()
  const transactionManagerStub = new TransactionStub()
  const updateWalletRepositoryStub = new UpdateWalletRepositoryStub()
  const createWalletCashOutModeLogRepositoryStub = new CreateWalletCashOutModeLogRepositoryStub()
  const sut = new CashOutMode(
    i18nStub,
    transactionManagerStub,
    updateWalletRepositoryStub,
    createWalletCashOutModeLogRepositoryStub
  )

  return {
    sut,
    i18nStub,
    transactionManagerStub,
    walletId,
    updateWalletRepositoryDto,
    updateWalletRepositoryStub,
    createWalletCashOutModeLogRepositoryStub
  }
}

describe('CashOutMode', () => {
  test('Should return 200 if cashout mode was set to enabled with success', async () => {
    const { sut, i18nStub, walletId, updateWalletRepositoryDto } = makeSut()
    const res = await sut.exec(walletId, { enabled: updateWalletRepositoryDto.cashOutModeEnabled })
    expect(res).toEqual(ok(i18nStub.t('CASHOUT_MODE_ENABLED_SUCCESSFULLY'), cashOutModeMockEnabled))
  })

  test('Should return 200 if cashout mode was set to disabled with success', async () => {
    const { sut, i18nStub, walletId, updateWalletRepositoryDto } = makeSut()
    updateWalletRepositoryDto.cashOutModeEnabled = false
    const res = await sut.exec(walletId, { enabled: updateWalletRepositoryDto.cashOutModeEnabled })
    expect(res).toEqual(ok(i18nStub.t('CASHOUT_MODE_DISABLED_SUCCESSFULLY'), cashOutModeMockDisabled))
  })

  test('Should call createWalletCashOutModeLogRepository at least one time with success', async () => {
    const { sut, walletId, updateWalletRepositoryDto, createWalletCashOutModeLogRepositoryStub } = makeSut()
    const spy = jest.spyOn(createWalletCashOutModeLogRepositoryStub, 'exec')
    await sut.exec(walletId, { enabled: updateWalletRepositoryDto.cashOutModeEnabled })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('Should call createWalletCashOutModeLogRepository with correct values', async () => {
    const { sut, walletId, updateWalletRepositoryDto, createWalletCashOutModeLogRepositoryStub, transactionManagerStub } = makeSut()
    const { cashOutModeEnabled } = updateWalletRepositoryDto
    const spy = jest.spyOn(createWalletCashOutModeLogRepositoryStub, 'exec')
    await sut.exec(walletId, { enabled: updateWalletRepositoryDto.cashOutModeEnabled })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({ walletId, cashOutModeEnabled }, transactionManagerStub)
  })
})
