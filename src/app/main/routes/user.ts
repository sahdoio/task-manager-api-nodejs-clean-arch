import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateUserController } from '../factories/user/create-user'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeCreateUserController()))
}
''