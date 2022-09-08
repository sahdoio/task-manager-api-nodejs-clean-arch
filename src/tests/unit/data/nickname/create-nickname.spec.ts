import { ok, unprocessableEntity } from '../../../../app/data/helpers/result'
import { CreateNicknameRepository, CreateNicknameRepositoryDto } from '../../../../app/data/protocols/repositories/nickname/create-nickname'
import { FindNicknameRepository } from '../../../../app/data/protocols/repositories/nickname/find-nickname'
import { Internationalization } from '../../../../app/data/protocols/utils/internationalization'
import { CreateNickname } from '../../../../app/data/useCases/nickname/create-nickname'
import { nicknameEntityMock } from '../../../utils/mocks/nickname-entity'
import { I18nStub } from '../../../utils/stubs/i18n-stub'
import { CreateNicknameRepositoryStub } from '../../../utils/stubs/repositories/nickname/create-nickname-repository-stub'
import { FindNicknameRepositoryStub } from '../../../utils/stubs/repositories/nickname/find-nickname-repository'

interface SutTypes {
  sut: CreateNickname
  i18nStub: Internationalization
  createNicknameRepositoryDto: CreateNicknameRepositoryDto
  createNicknameRepositoryStub: CreateNicknameRepository
  findNicknameRepositoryStub: FindNicknameRepository
}

const makeSut = (): SutTypes => {
  const createNicknameRepositoryDto = {
    name: 'Joaozinho',
    userId: 1,
    accountId: 2
  }

  const i18nStub = new I18nStub()
  const findNicknameRepositoryStub = new FindNicknameRepositoryStub()
  const createNicknameRepositoryStub = new CreateNicknameRepositoryStub()
  const sut = new CreateNickname(
    i18nStub,
    createNicknameRepositoryStub,
    findNicknameRepositoryStub
  )
  return {
    sut,
    createNicknameRepositoryDto,
    findNicknameRepositoryStub,
    createNicknameRepositoryStub,
    i18nStub
  }
}

describe('CreateNickname', () => {
  test('Should return 422-EXISTING_NICKNAME_PARTNER if the account already exists', async () => {
    const { sut, i18nStub, createNicknameRepositoryDto } = makeSut()
    const res = await sut.exec(createNicknameRepositoryDto)
    expect(res).toEqual(unprocessableEntity(i18nStub.t('EXISTING_NICKNAME_PARTNER')))
  })

  test('Should return 200 if the account not exists and there is no error', async () => {
    const { sut, i18nStub, createNicknameRepositoryDto, findNicknameRepositoryStub } = makeSut()
    jest.spyOn(findNicknameRepositoryStub, 'findOne').mockImplementationOnce(() => null)
    const res = await sut.exec(createNicknameRepositoryDto)
    expect(res).toEqual(ok(i18nStub.t('CREATE_NICKNAME_SUCCESSFUL'), nicknameEntityMock))
  })

  test('Should call findNicknameRepository with correct values', async () => {
    const { sut, createNicknameRepositoryDto, findNicknameRepositoryStub } = makeSut()
    const { userId, accountId } = createNicknameRepositoryDto
    const spy = jest.spyOn(findNicknameRepositoryStub, 'findOne')
    await sut.exec(createNicknameRepositoryDto)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({ userId, accountId })
  })

  test('Should call createNicknameRepository with correct values', async () => {
    const { sut, createNicknameRepositoryDto, createNicknameRepositoryStub, findNicknameRepositoryStub } = makeSut()
    jest.spyOn(findNicknameRepositoryStub, 'findOne').mockImplementationOnce(() => null)
    const spy = jest.spyOn(createNicknameRepositoryStub, 'exec')
    await sut.exec(createNicknameRepositoryDto)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(createNicknameRepositoryDto)
  })
})
