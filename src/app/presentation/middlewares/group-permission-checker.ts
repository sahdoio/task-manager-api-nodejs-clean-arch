import { GroupPermissionCheckerUc } from '../../domain/useCases/auth/group-permission-checker'
import { forbidden, serverError, serverOk } from '../helpers/http'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class GroupPermissionCheckerMiddleware implements Middleware {
  constructor (
    private readonly groupPermissionChecker: GroupPermissionCheckerUc
  ) {}

  async handle (data: HttpRequest): Promise<HttpResponse> {
    if (!data.currentUser) {
      console.log('currentUser not found')
      return serverError()
    }

    const hasPermission = await this.groupPermissionChecker.hasRoutePermission({
      verb: data.request.verb,
      route: data.request.route,
      personaId: data.currentUser.currentUserWalletPersonaId
    })

    return hasPermission ? serverOk() : forbidden()
  }
}
