import Router from 'koa-router'
import * as shot from '../controllers/shot'
import * as user from '../controllers/user'

const router = new Router()

router.post('/shot', shot.addShot)
router.get('/me', user.me)

export default router
