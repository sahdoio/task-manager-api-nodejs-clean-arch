import { WalletCheckerUc } from '../../domain/useCases/auth/wallet-checker'
import { forbidden, serverOk } from '../helpers/http'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class WalletCheckerMiddleware implements Middleware {
  constructor (
    private readonly walletChecker: WalletCheckerUc
  ) {}

  async handle (data: HttpRequest): Promise<HttpResponse> {
    const { currentWalletId } = data.currentUser

    const result = await this.walletChecker.exec({
      walletId: currentWalletId
    })

    return result ? serverOk() : forbidden()
  }
}
