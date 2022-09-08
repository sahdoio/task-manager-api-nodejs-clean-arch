import { Result } from '../../../../../app/domain/protocols/result'
import { CashOutModeResponseDto, CashOutModeUc, CashOutModeUcDto } from '../../../../../app/domain/useCases/user/cashout-mode'
import { cashOutModeMockEnabled } from '../../../mocks/user/cashout-mode'
import { I18nStub } from '../../i18n-stub'

export class CashOutModeUcStub implements CashOutModeUc {
  async exec (walletId: number, data: CashOutModeUcDto): Promise<Result<CashOutModeResponseDto>> {
    const i18nStub = new I18nStub()
    return {
      code: 200,
      data: cashOutModeMockEnabled,
      msg: i18nStub.t('CASHOUT_MODE_ENABLED_SUCCESSFULLY')
    }
  }
}
