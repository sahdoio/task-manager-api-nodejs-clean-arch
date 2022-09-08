import { LoginUc } from '../../../domain/useCases/auth/login'
import { serverError, serverResponse } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { FieldValidator } from '../../../data/protocols/utils/field-validator'
import { missingFields } from '../../helpers/response-builder'
import { UcOptions } from '../../../domain/protocols/uc-options'

export class LoginController implements Controller {
  constructor (
    private readonly loginUc: LoginUc,
    private readonly validator: FieldValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      const validation = this.validator.validate(requiredFields, httpRequest.body)
      if (!validation.success) {
        return serverResponse(missingFields(validation.missingFields))
      }
      const { email, password } = httpRequest.body
      const ucOptions: UcOptions = { forceHiddenFields: true }
      const res = await this.loginUc.exec(email, password, ucOptions)
      if (res.data?.user) {
        res.data.user.password = undefined
      }
      return serverResponse(res)
    } catch (err) {
      console.log(err)
      return serverError()
    }
  }
}
