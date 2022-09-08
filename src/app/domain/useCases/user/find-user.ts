import { UserEntity } from '../../entities/User'
import { Result } from '../../protocols/result'

export interface FindUserDto {
  id?: number
  email?: string
}

export interface FindUserUc {
  exec: (user: FindUserDto) => Promise<Result<UserEntity>>
}
