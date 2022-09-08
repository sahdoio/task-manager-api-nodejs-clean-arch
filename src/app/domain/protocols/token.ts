export interface Token {
  id: number
  userWalletId?: number
  personaId?: number
  walletId?: number
  walletStatus?: number
  walletTeamId?: number
  walletSponsorCode?: string
  iat: number
  exp: number
}
