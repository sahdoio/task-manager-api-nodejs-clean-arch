import { NicknameEntity } from '../../../app/domain/entities/Nickname'

export const nicknameEntityMock: NicknameEntity = {
  id: 1,
  account: null,
  user: null,
  name: 'Batman',
  createdAt: new Date('2021-12-08 00:00:00'),
  updatedAt: new Date('2021-12-08 00:00:00')
}
