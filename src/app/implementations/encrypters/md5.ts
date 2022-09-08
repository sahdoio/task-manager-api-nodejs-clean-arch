import md5 from 'crypto-js/md5'
import { Encrypter } from '../../data/protocols/utils/encrypter'

export class CryptoMd5 implements Encrypter {
  async encrypt (plain: string): Promise<string> {
    return md5(plain).toString()
  }

  async compare (plain: string, encrypted: string): Promise<boolean> {
    return (await this.encrypt(plain)) === encrypted
  }
}
