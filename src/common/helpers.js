import path from 'path'
import fs from 'fs'
import pify from 'pify'
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
