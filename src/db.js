import mongoose from 'mongoose'
import {env} from './common/helpers'

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://localhost/tucao-api-${env}`)
