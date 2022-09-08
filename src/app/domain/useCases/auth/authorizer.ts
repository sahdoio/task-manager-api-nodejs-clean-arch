export interface LoggedUser {
  id: number
  name?: string
  email: string
  currentUserWalletId?: number
  currentUserWalletPersonaId?: number
  currentWalletId?: number
  walletTeamId?: number
  walletStatus?: number
  currentWalletSponsorCode?: string
}

export interface Authorizer {
  isAuthorized: (accessToken: string) => Promise<LoggedUser | boolean>
}
