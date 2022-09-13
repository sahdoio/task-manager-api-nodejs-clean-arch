import { UserEntity } from '../../entities/User'
import { Result } from '../../protocols/result'

export interface CreateUserDTO {
  email?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  password?: string
}

export interface CreateUserUc {
  exec: (user: CreateUserDTO, uniqueFields: string[]) => Promise<Result<UserEntity>>
}
