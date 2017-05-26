import Router from 'koa-router'
import * as auth from '../controllers/auth'
import * as shot from '../controllers/shot'
import * as comment from '../controllers/comment'

const router = new Router()

router.post('/auth/signup', auth.signup)
router.post('/auth/signin', auth.signin)

router.get('/shots', shot.shots)
router.get('/shot/:shot/comments', comment.comments)

export default router
