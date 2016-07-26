import pify from 'pify'
import bcrypt from 'bcrypt'
import joi from 'joi'

export const encrypt = pify(bcrypt)

export const validate = pify(joi.validate)
