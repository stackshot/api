import path from 'path'
import fs from 'fs'
import pify from 'pify'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import joi from 'joi'

export function basePath(...args) {
  return path.join(__dirname, '../../', ...args)
}

export function appPath(...args) {
  return path.join(__dirname, '../../lib', ...args)
}

export const env = process.env.NODE_ENV || 'development'

export const publicKey = fs.readFileSync(basePath(`${env}.rsa.pub`))
export const privateKey = fs.readFileSync(basePath(`${env}.rsa`))

export const encrypt = pify(bcrypt)

export const validate = pify(joi.validate)

export function generateJWT(user) {
  return jwt.sign(
    {
      username: user.username,
      email: user.email,
      _id: user._id
    },
    privateKey,
    {
      algorithm: 'RS256'
    }
  )
}

export function sendError(ctx, err, status) {
  ctx.status = status || err.statusCode || err.status || 500
  if (err.name === 'ValidationError') {
    ctx.body = err
  } else {
    ctx.body = {
      message: typeof err === 'string'
        ? err
        : env === 'production' ? err.message : err.stack
    }
  }
}
