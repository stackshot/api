import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import convert from 'koa-convert'
import {publicKey} from './common/helpers'

import './db'

import publicRouter from './routers/public-router'

const app = new Koa()

app.use(bodyparser())
app.use(publicRouter.routes())
app.use(publicRouter.allowedMethods())

app.use(convert(jwt({
  secret: publicKey,
  algorithm: 'RS256'
})))

app.listen(7999, () => {
  console.log('http://localhost:7999')
})
