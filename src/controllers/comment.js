import _ from 'lodash'
import joi from 'joi'
import ObjectId from 'objectid'
import Comment from '../models/comment'
import User from '../models/user'
import { validate, sendError, getPageOptions } from '../common/helpers'

export async function addComment(ctx) {
  const user = await User.findOne({ _id: ctx.state.user._id })
    .select('username')
    .exec()

  if (!user) {
    return sendError(ctx, 'User not found', 403)
  }

  let commentData = _.pick(ctx.request.body, ['content', 'parent', 'shot'])

  try {
    commentData = await validate(
      commentData,
      joi.object().keys({
        parent: joi.string(),
        shot: joi.string().required(),
        content: joi.string().required()
      })
    )

    commentData.user = user

    const comment = new Comment(commentData)
    ctx.body = await comment.save()
  } catch (err) {
    sendError(ctx, err)
  }
}

export async function comments(ctx) {
  const { shot } = ctx.params
  if (!shot || !ObjectId.isValid(shot)) {
    return sendError(ctx, 'Parameter "shot" is invalid')
  }

  const { before, limit } = getPageOptions(ctx.query)
  console.log(before)
  const comments = await Comment.find({
    shot,
    createdAt: {
      $lt: before
    }
  })
    .sort('-createdAt')
    .limit(limit)
    .populate('user', 'username avatar')
    .exec()

  ctx.body = {
    data: comments
  }
}
