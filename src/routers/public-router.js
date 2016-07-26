import Router from 'koa-router'
import joi from 'joi'
import jwt from 'koa-jwt'
import User from '../models/user'
import {
  encrypt,
  validate,
  privateKey
} from '../common/helpers'

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

publicRouter.post('/auth/signin', async ctx => {
  let userData = {
    // username or email
    account: ctx.request.body.account,
    password: ctx.request.body.password
  }

  try {
    userData = await validate(userData, joi.object().keys({
      account: joi.string().min(2).max(20).required(),
      password: joi.string().min(6).max(20).required()
    }))
  } catch (e) {
    ctx.body = e
    return
  }

  const user = await User.findOne({
    $or: [
      {username: userData.account},
      {email: userData.account}
    ]
  }).exec()

  if (!user) {
    return ctx.body = {
      error: 'User not found'
    }
  }

  const isPasswordCorrect = await encrypt.compare(userData.password, user.password)

  if (!isPasswordCorrect) {
    return ctx.body = {
      error: 'Passoword mismatches'
    }
  }

  const token = jwt.sign(user, privateKey, {algorithm: 'RS256'})

  ctx.body = {token}
})

export default publicRouter
