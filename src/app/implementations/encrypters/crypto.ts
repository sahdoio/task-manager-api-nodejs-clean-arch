import sha256 from 'crypto-js/sha256'
import { Encrypter } from '../../data/protocols/utils/encrypter'

export class CryptoSha256 implements Encrypter {
  async encrypt (plain: string): Promise<string> {
    return sha256(plain).toString()
  }

  async compare (plain: string, encrypted: string): Promise<boolean> {
    return (await this.encrypt(plain)) === encrypted
  }
}
