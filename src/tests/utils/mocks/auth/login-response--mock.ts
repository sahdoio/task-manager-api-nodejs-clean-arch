import { LoginResponseDto } from "../../../../app/domain/useCases/auth/login";
import { userEntityMock } from "../user/user-entity-mock";

export const loginResponseMock: Promise<LoginResponseDto> = (async () => ({
    accessToken: 'token',
    user: await userEntityMock,
}))()