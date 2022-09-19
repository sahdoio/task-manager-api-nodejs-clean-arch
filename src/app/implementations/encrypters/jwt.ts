import { JWT } from '../../data/protocols/auth/jwt'
import jsonWebToken from 'jsonwebtoken'
import { JwtConfig } from '../../data/protocols/auth/jwt-config'
import { Token } from '../../domain/protocols/token'

export class JsonWebToken implements JWT {
  async sign (data: any, config: JwtConfig): Promise<string> {
    return jsonWebToken.sign(
      data,
      config.key,
      { expiresIn: config.expiresIn * 60 }
    )
  }

  async verify (token: string, key: string, ignoreExpiration?: boolean): Promise<Token|null> {
    try {
      return (jsonWebToken.verify(token, key, { ignoreExpiration })) as Token
    } catch (err) {
      console.error(err)
      return null
    }
  }

  async decode (token: string): Promise<Token> {
    return jsonWebToken.decode(token) as Token
  }
}
