import env from '../../../../env'
import { Login } from '../../../data/useCases/auth/login'
import { JsonWebToken } from '../../../implementations/encrypters/jwt'
import { I18n } from '../../../implementations/internationalization/i18n'
import { CryptoSha256 } from '../../../implementations/encrypters/crypto'
import { PersonalFieldValidator } from '../../../implementations/helpers/validate-fields'
import { SpeakEasyTfa } from '../../../implementations/encrypters/speakeasy'
import { DbFindUserRepository } from '../../../implementations/repositories/legacy/user/db-find-user-repository'
import { CryptoMd5 } from '../../../implementations/encrypters/md5'
import { LegacyFindUserWalletRepository } from '../../../implementations/repositories/legacy/userWallet/legacy-find-user-wallet-repository'
import { LegacyFindPersonaWalletPermissionRepository } from '../../../implementations/repositories/legacy/personaWalletPermission/legacy-find-persona-wallet-permission-repository'
import { LegacyFindWalletCoinRepository } from '../../../implementations/repositories/legacy/walletCoin/legacy-find-wallet-coin-repository'
import { AnonymizeData } from '../../../implementations/helpers/anonymize-data'
import { LegacyFindTransactionWalletSubTypePermissionRepository } from '../../../implementations/repositories/legacy/transactionWalletSubTypePermission/legacy-find-transaction-wallet-sub-type-permission'
import { CheckPasswordController } from '../../../presentation/controllers/auth/check-password'

export const makeCheckPasswordController = (): CheckPasswordController => {
  const findUserRepository = new DbFindUserRepository()
  const findUserWalletRepository = new LegacyFindUserWalletRepository()
  const legacyFindPersonaWalletPermissionRepository = new LegacyFindPersonaWalletPermissionRepository()
  const legacyFindWalletCoinRepository = new LegacyFindWalletCoinRepository()
  const findTransactionWalletSubTypePermissionRepository = new LegacyFindTransactionWalletSubTypePermissionRepository()
  const md5 = new CryptoMd5()
  const sha256 = new CryptoSha256()
  const jsonWebToken = new JsonWebToken()
  const i18n = new I18n()
  const speakeasy = new SpeakEasyTfa()
  const anonymizeData = new AnonymizeData()

  const jwtConfig = {
    key: env.security.JWT_KEY,
    expiresIn: env.security.JWT_EXPIRES_IN
  }
  const loginUc = new Login(
    findUserRepository,
    findUserWalletRepository,
    legacyFindPersonaWalletPermissionRepository,
    legacyFindWalletCoinRepository,
    findTransactionWalletSubTypePermissionRepository,
    md5,
    sha256,
    i18n,
    jsonWebToken,
    jwtConfig,
    env.security.HASH_PADDING,
    anonymizeData,
    env.security.TFA_ENABLED,
    speakeasy
  )

  const validator = new PersonalFieldValidator()
  const controller = new CheckPasswordController(loginUc, validator)

  return controller
}
