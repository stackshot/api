import User from '../models/user'

export async function me(ctx) {
  const user = await User
    .findOne({apiKey: ctx.state.user.apiKey})
    .select('username email createdAt updatedAt')
    .exec()
  ctx.body = user
}
