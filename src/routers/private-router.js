import Router from 'koa-router'
import * as shot from '../controllers/shot'
import * as user from '../controllers/user'
import * as media from '../controllers/media'
import * as comment from '../controllers/comment'

const router = new Router()

router.post('/shot', shot.addShot)
router.post('/comment', comment.addComment)
router.get('/me', user.me)
router.post('/media/upload_image', media.uploadImage)

export default router
