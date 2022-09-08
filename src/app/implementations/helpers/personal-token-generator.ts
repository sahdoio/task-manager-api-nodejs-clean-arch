import { TokenGenerator } from '../../data/protocols/utils/token'

export class PersonalTokenGenerator implements TokenGenerator {
  private getRandomInt (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min
  }

  async generate (size: number, numberProbability: number = 0.5): Promise<string> {
    if (!size || size < 1) {
      throw new Error('Invalid Size')
    }

    const charAsc2NumberRange = [48, 57]
    const charAsc2LettersRange = [65, 90]

    let token = ''
    for (let i = 0; i < size; i++) {
      const charRange = Math.random() <= numberProbability ? charAsc2NumberRange : charAsc2LettersRange
      token += String.fromCharCode(this.getRandomInt(charRange[0], charRange[1]))
    }

    return token
  }
}
