import joi from 'joi'
import User from '../models/user'
import Shot from '../models/shot'
import {validate} from '../common/helpers'

export async function addShot(ctx) {
  const user = await User
    .findOne({apiKey: ctx.state.user.apiKey})
    .select('username')
    .exec()

  if (!user) {
    ctx.body = {
      error: 'User not found'
    }
    return
  }

  let shotData = {
    images: ctx.request.body.images,
    tags: ctx.request.body.tags || []
  }
  try {
    shotData = await validate(shotData, joi.object().keys({
      images: joi.array().items(joi.object().keys({
        url: joi.string().required(),
        description: joi.any().optional()
      }).required()).required(),
      tags: joi.array().items(joi.string())
    }))
    shotData.user = user

    const shot = new Shot(shotData)
    ctx.body = await shot.save()
  } catch (e) {
    console.log(e.stack)
    ctx.body = e
  }
}

export async function shots(ctx) {
  const {skip = 0, limit = 20} = ctx.query
  const shots = await Shot
    .find()
    .sort('-createdAt')
    .skip(parseInt(skip, 10))
    .limit(parseInt(limit, 10))
    .populate('user', 'username avatar')
    .exec()

  ctx.body = {
    data: shots
  }
}
