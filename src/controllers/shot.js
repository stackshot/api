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

  try {
    let shotData = {
      sourceName: ctx.request.body.sourceName,
      images: ctx.request.body.images
    }
    shotData = await validate(shotData, joi.object().keys({
      sourceName: joi.string().optional(),
      images: joi.array().items(joi.object().keys({
        url: joi.string().required(),
        description: joi.any().optional()
      }).required()).required()
    }))
    shotData.user = user

    const shot = new Shot(shotData)
    ctx.body = await shot.save()
  } catch (e) {
    console.log(e.stack)
    ctx.body = e
  }
}
