import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateTaskController } from '../factories/controllers/task/create-task'
import { makeAuthMiddleware } from '../factories/middlewares/auth'

export default (router: Router): void => {
  router.post('/tasks', 
    adaptMiddleware(makeAuthMiddleware(), true),
    adaptRoute(makeCreateTaskController()))
}