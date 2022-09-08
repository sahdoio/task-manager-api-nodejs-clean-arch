export interface TokenGenerator {
  generate: (size: number, numberProbability?: number) => Promise<string>
}
