import { resolve } from 'path'
import { Encrypter } from '../../../app/data/protocols/utils/encrypter'
import { Internationalization } from '../../../app/data/protocols/utils/internationalization'

export class BcryptStub implements Encrypter {
  encrypt(plain: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(plain)
    })
  }

  compare(plain: string, encrypted: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }
}
