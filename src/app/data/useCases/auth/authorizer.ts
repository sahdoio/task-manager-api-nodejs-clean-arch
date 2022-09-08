import { Authorizer, LoggedUser } from '../../../domain/useCases/auth/authorizer'
import { JWT } from '../../protocols/auth/jwt'
import { JwtConfig } from '../../protocols/auth/jwt-config'
import { FindUserRepository } from '../../protocols/repositories/user/find-user-repository'

export class DefaultAuthorizer implements Authorizer {
  constructor (
    private readonly jwt: JWT,
    private readonly jwtConfig: JwtConfig,
    private readonly findUserRepository: FindUserRepository
  ) {}

  async isAuthorized (accessToken: string): Promise<LoggedUser> {
    try {
      const tokenData = await this.jwt.verify(accessToken, this.jwtConfig.key)
      if (!tokenData) {
        return null
      }

      const user = await this.findUserRepository.findOne({ id: tokenData.id })

      return {
        id: user.id,
        email: user.email,
        currentUserWalletId: tokenData.userWalletId,
        currentUserWalletPersonaId: tokenData.personaId,
        currentWalletId: tokenData.walletId,
        walletStatus: tokenData.walletStatus,
        walletTeamId: tokenData.walletTeamId
      }
    } catch (err) {
      console.error(err)
      return null
    }
  }
}
