import { UserEntity } from "../../../../app/domain/entities/User";
import { Bcrypt } from "../../../../app/implementations/encrypters/bcrypt";

export const userEntityMock: UserEntity = {
  id: 1,
  email: 'user_test@test.com',
  firstName: 'User',
  lastName: 'Test',
  password: '123456',
  createdAt: new Date(),
  updatedAt: new Date()
}