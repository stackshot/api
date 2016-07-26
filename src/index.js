import Koa from 'koa'
import bodyparser from 'koa-bodyparser'

import './db'

import publicRouter from './routers/public-router'

const app = new Koa()

app.use(bodyparser())
app.use(publicRouter.routes())
app.use(publicRouter.allowedMethods())

app.listen(7999, () => {
  console.log('http://localhost:7999')
})
