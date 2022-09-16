import { FieldValidator } from '../../../data/protocols/utils/field-validator'
import { CreateUserDto, CreateUserUc } from '../../../domain/useCases/user/create-user'
import { serverError, serverResponse } from '../../helpers/http'
import { missingFields } from '../../helpers/response-builder'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateUserController implements Controller {
  constructor(
    private readonly validator: FieldValidator,
    private readonly uc: CreateUserUc
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password', 'phoneNumber']
      const validation = this.validator.validate(requiredFields, httpRequest.body)
      if (!validation.success) {
        return serverResponse(missingFields(validation.missingFields))
      }
      const { email, firstName, lastName, phoneNumber, password } = httpRequest.body
      const data: CreateUserDto = {
        email,
        firstName,
        lastName,
        phoneNumber,
        password
      }
      const res = await this.uc.exec(data)
      return serverResponse(res)
    } catch (err) {
      console.error(err)
      return serverError()
    }
  }
}
