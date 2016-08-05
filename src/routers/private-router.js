import Router from 'koa-router'
import * as shot from '../controllers/shot'
import * as user from '../controllers/user'
import * as media from '../controllers/media'

const router = new Router()

router.post('/shot', shot.addShot)
router.get('/me', user.me)
router.post('/media/upload_image', media.uploadImage)

export default router
