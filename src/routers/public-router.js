import Router from 'koa-router'
import * as auth from '../controllers/auth'
import * as shot from '../controllers/shot'

const router = new Router()

router.post('/auth/signup', auth.signup)
router.post('/auth/signin', auth.signin)

router.get('/shots', shot.shots)

export default router
