import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import timestamp from 'mongoose-timestamp'

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  apiKey: {
    type: String
  }
})

schema.plugin(uniqueValidator)
schema.plugin(timestamp)

export default mongoose.model('User', schema)
