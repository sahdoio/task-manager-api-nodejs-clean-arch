import env from './env'
import { Application } from './app'

const application = new Application()
application.setupDb().then(() => {
  application.app.listen(env.PORT, async () => {
    console.log('Port %s', env.PORT)
  })
}).catch(err => {
  console.error(err)
})

export default application
