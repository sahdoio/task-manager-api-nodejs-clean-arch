/* istanbul ignore file */

import { Tfa, TfaGenerateSecretReturnDto } from '../../data/protocols/utils/tfa'
import speakeasy from 'speakeasy'
import QrCode from 'qrcode'

export class SpeakEasyTfa implements Tfa {
  async generateSecret (): Promise<TfaGenerateSecretReturnDto> {
    const secret = speakeasy.generateSecret({ name: 'GamersWallet' })
    return {
      secret: secret.base32,
      optAuthUrl: secret.otpauth_url
    }
  }

  async generateQrCode (optAuthUrl: string): Promise<string> {
    return await (new Promise((resolve, reject) => {
      QrCode.toDataURL(optAuthUrl, (err, dataUrl) => {
        if (err) {
          reject(err)
          return
        }
        resolve(dataUrl)
      })
    }))
  }

  async verify (secret: string, token: string): Promise<boolean> {
    return speakeasy.totp.verify({ secret, token, encoding: 'base32' })
  }
}
