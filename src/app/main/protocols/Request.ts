import { Request } from 'express'
import { LoggedUser } from '../../domain/useCases/auth/authorizer'

export interface GamersBankRequest extends Request {
  currentUser: LoggedUser
}
