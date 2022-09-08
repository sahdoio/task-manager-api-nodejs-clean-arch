import { CreateWalletCashOutModeLogRepository, CreateWalletCashOutModeLogRepositoryDto } from '../../../../../app/data/protocols/repositories/walletCashOutModeLog/create-wallet-cashout-mode-log-repository'
import { WalletCashOutModeLogEntity } from '../../../../../app/domain/entities/WalletCashOutModeLog'
import { walletCashOutModeLogEntityMock } from '../../../mocks/user/wallet-cashout-mode-log-entity'
import { DbRepositoryStub } from '../db-repository-stub'

export class CreateWalletCashOutModeLogRepositoryStub extends DbRepositoryStub implements CreateWalletCashOutModeLogRepository {
  async exec (data: CreateWalletCashOutModeLogRepositoryDto, transaction?: any): Promise<WalletCashOutModeLogEntity> {
    return walletCashOutModeLogEntityMock
  }
}
