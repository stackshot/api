import mongoose, { Schema } from 'mongoose'
import timestamp from 'mongoose-timestamp'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  images: {
    type: Array
  },
  tags: {
    type: Array
  },
  comments: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
})

schema.plugin(timestamp)

export default mongoose.model('Shot', schema)
