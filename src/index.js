import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import cors from 'kcors'
import {publicKey} from './common/helpers'

import './db'

import publicRouter from './routers/public-router'
import privateRouter from './routers/private-router'

export default () => {
  const app = new Koa()

  app.use(cors())
  app.use(bodyparser())
  app.use(publicRouter.routes())
  app.use(publicRouter.allowedMethods())

  app.use(async (ctx, next) => {
    try {
      await next() // Attempt to go through the JWT Validator
    } catch (e) {
      if (e.status == 401 ) {
        // Prepare response to user.
        ctx.status = e.status
        ctx.body = {error: 'You don\'t have a signed token dude :('}
      } else {
        throw e // Pass the error to the next handler since it wasn't a JWT error.
      }
    }
  })

  app.use(jwt({
    secret: publicKey,
    algorithm: 'RS256'
  }))

  app.use(privateRouter.routes())
  app.use(privateRouter.allowedMethods())

  return app
}
