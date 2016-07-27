import mongoose, {Schema} from 'mongoose'
import timestamp from 'mongoose-timestamp'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sourceName: {
    // eg: '灵能百分百'
    type: String
  },
  images: {
    type: Array
  },
  commentCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  }
})

schema.plugin(timestamp)

export default mongoose.model('Shot', schema)
