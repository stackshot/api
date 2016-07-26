import Router from 'koa-router'
import joi from 'joi'
import User from '../models/user'
import {encrypt, validate} from '../common/helpers'

const publicRouter = new Router()

publicRouter.post('/auth/signup', async ctx => {
  let userData = {
    username: ctx.request.body.username,
    email: ctx.request.body.email,
    password: ctx.request.body.password
  }

  try {
    userData = await validate(userData, joi.object().keys({
      username: joi.string().min(2).max(20).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(20).required()
    }))

    userData.password = await encrypt.hash(userData.password, 10)
    const user = new User(userData)

    ctx.body = await user.save()
  } catch (e) {
    ctx.body = e
  }
})



export default publicRouter
