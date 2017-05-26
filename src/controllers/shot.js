import joi from 'joi'
import User from '../models/user'
import Shot from '../models/shot'
import { validate, sendError, getPageOptions } from '../common/helpers'

export async function addShot(ctx) {
  const user = await User.findOne({ _id: ctx.state.user._id })
    .select('username')
    .exec()

  if (!user) {
    return sendError(ctx, 'User not found', 403)
  }

  let shotData = {
    images: ctx.request.body.images,
    tags: ctx.request.body.tags || []
  }
  try {
    shotData = await validate(
      shotData,
      joi.object().keys({
        images: joi
          .array()
          .items(
            joi
              .object()
              .keys({
                url: joi.string().required(),
                description: joi.any().optional()
              })
              .required()
          )
          .required(),
        tags: joi.array().items(joi.string())
      })
    )
    shotData.user = user

    const shot = new Shot(shotData)
    ctx.body = await shot.save()
  } catch (err) {
    sendError(ctx, err)
  }
}

export async function shots(ctx) {
  const { before, limit } = getPageOptions(ctx.query)

  const shots = await Shot.find({ createdAt: { $lt: before } })
    .sort('-createdAt')
    .limit(limit)
    .populate('user', 'username avatar')
    .exec()

  ctx.body = {
    data: shots
  }
}
