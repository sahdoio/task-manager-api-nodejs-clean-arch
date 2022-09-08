import { UpdateWalletRepoDto, UpdateWalletRepository } from '../../../../../app/data/protocols/repositories/wallet/update-wallet-repository'
import { DbRepositoryStub } from '../db-repository-stub'

export class UpdateWalletRepositoryStub extends DbRepositoryStub implements UpdateWalletRepository {
  async exec (id: number, data: UpdateWalletRepoDto, transaction?: any): Promise<boolean> {
    return true
  }
}
