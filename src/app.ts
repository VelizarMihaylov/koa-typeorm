import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { users } from '@src/routes'

const app = new Koa()

app.use(bodyParser())
app.use(users.allowedMethods())
app.use(users.routes())

export default app
