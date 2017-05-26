import mongoose, { Schema } from 'mongoose'
import timestamp from 'mongoose-timestamp'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // Comment content
  content: {
    type: String
  },
  // The parent comment id
  // If this is a reply to a comment
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  // The shot it belongs to
  shot: {
    type: Schema.Types.ObjectId,
    ref: 'Shot'
  }
})

schema.plugin(timestamp)

export default mongoose.model('Comment', schema)
