import joi from 'joi'
import jwt from 'jsonwebtoken'
import uuid from 'node-uuid'
import _ from 'lodash'
import User from '../models/user'
import { encrypt, validate, generateJWT, sendError } from '../common/helpers'

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

    const user = new User(userData)
    await user.save()

    ctx.body = {
      token: generateJWT(user),
      user: _.omit(user.toObject(), ['password'])
    }
  } catch (err) {
    sendError(ctx, err, 401)
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
    return sendError(ctx, err, 401)
  }

  const user = await User.findOne({
    $or: [{ username: userData.account }, { email: userData.account }]
  }).exec()

  if (!user) {
    return sendError(ctx, 'User not found', 401)
  }

  const isPasswordCorrect = await encrypt.compare(
    userData.password,
    user.password
  )

  if (!isPasswordCorrect) {
    return sendError(ctx, 'Passoword mismatches', 401)
  }

  ctx.body = {
    token: generateJWT(user),
    user: _.omit(user.toObject(), ['password'])
  }
}
