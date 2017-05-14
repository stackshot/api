import joi from 'joi'
import jwt from 'koa-jwt'
import uuid from 'node-uuid'
import _ from 'lodash'
import User from '../models/user'
import { encrypt, validate, privateKey } from '../common/helpers'

export async function signup(ctx) {
  let userData = {
    username: ctx.request.body.username,
    email: ctx.request.body.email,
    password: ctx.request.body.password
  }

  try {
    userData = await validate(
      userData,
      joi.object().keys({
        username: joi.string().min(2).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(20).required()
      })
    )

    userData.password = await encrypt.hash(userData.password, 10)
    userData.apiKey = uuid.v4()

    const user = new User(userData)
    await user.save()

    const token = jwt.sign({ apiKey: userData.apiKey }, privateKey, {
      algorithm: 'RS256'
    })
    ctx.body = {
      token,
      user: _.pick(user.toObject(), [
        'username',
        'avatar',
        'createdAt',
        'updatedAt'
      ])
    }
  } catch (err) {
    ctx.body = err
  }
}

export async function signin(ctx) {
  let userData = {
    // username or email
    account: ctx.request.body.account,
    password: ctx.request.body.password
  }

  try {
    userData = await validate(
      userData,
      joi.object().keys({
        account: joi.string().min(2).max(20).required(),
        password: joi.string().min(6).max(20).required()
      })
    )
  } catch (err) {
    ctx.body = err
    return
  }

  const user = await User.findOne({
    $or: [{ username: userData.account }, { email: userData.account }]
  }).exec()

  if (!user) {
    ctx.body = {
      error: 'User not found'
    }
    return
  }

  const isPasswordCorrect = await encrypt.compare(
    userData.password,
    user.password
  )

  if (!isPasswordCorrect) {
    ctx.body = {
      error: 'Passoword mismatches'
    }
    return
  }

  const token = jwt.sign({ apiKey: user.apiKey }, privateKey, {
    algorithm: 'RS256'
  })
  ctx.body = {
    token,
    user: _.pick(user.toObject(), [
      'username',
      'avatar',
      'createdAt',
      'updatedAt'
    ])
  }
}
