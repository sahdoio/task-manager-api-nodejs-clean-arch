import { UserEntity } from "../../../../app/domain/entities/User";
import { Bcrypt } from "../../../../app/implementations/encrypters/bcrypt";

export const userEntityMock: Promise<UserEntity> = (async () => ({
  id: 1,
  email: 'user_test@test.com',
  firstName: 'User',
  lastName: 'Test',
  password: await (new Bcrypt()).encrypt('123456'),
  createdAt: new Date(),
  updatedAt: new Date()
}))()