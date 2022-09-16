import { LoginResponseDto, LoginUc } from '../../../domain/useCases/auth/login'
import { ok, unprocessableEntity } from '../../helpers/result'
import { Encrypter } from '../../protocols/utils/encrypter'
import { Result } from '../../../domain/protocols/result'
import { JWT } from '../../protocols/auth/jwt'
import { JwtConfig } from '../../protocols/auth/jwt-config'
import { Internationalization } from '../../protocols/utils/internationalization'
import { FindUserRepository } from '../../protocols/repositories/user/find-user-repository'
import { UcOptions } from '../../../domain/protocols/uc-options'

export class Login implements LoginUc {
  constructor (
    private readonly findUserRepository: FindUserRepository,
    private readonly passwordEncrypter: Encrypter,
    private readonly i18n: Internationalization,
    private readonly jwt: JWT,
    private readonly jwtConfig: JwtConfig
  ) {}

  async exec (email: string, password: string, ucOptions?: UcOptions): Promise<Result<LoginResponseDto>> {
    const user = await this.findUserRepository.findOne({ email }, ucOptions, true)
    if (!user) {
      return unprocessableEntity(this.i18n.t('INVALID_LOGIN'))
    }
    const isCorrect = await this.passwordEncrypter.compare(password, user.password)
    if (!isCorrect) {
      return unprocessableEntity(this.i18n.t('INVALID_LOGIN'))
    }
    const userData = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }
    const jwtData = {
      id: user.id,
      email: user.email,   
    }
    const accessToken: string = await this.jwt.sign(jwtData, this.jwtConfig)
    const loginResponseDto: LoginResponseDto = {
      accessToken,
      user: userData,
    }
    return ok(this.i18n.t('LOGIN_SUCCESSFUL'), loginResponseDto)
  }
}
