import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateTaskController } from '../factories/task/create-task'

export default (router: Router): void => {
  router.post('/tasks', adaptRoute(makeCreateTaskController()))
}