import User from '../models/user'
import { sendError } from '../common/helpers'

export async function me(ctx) {
  // ctx.state.user.apiKey is undefined
  // db.user.apiKey is also undefined
  const user = await User.findOne({ _id: ctx.state.user._id })
    .select('username email createdAt updatedAt')
    .exec()
  if (!user) {
    return sendError(ctx, 'Authorization failed', 401)
  }
  ctx.body = user
}
