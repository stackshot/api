import Router from 'koa-router'
import * as shot from '../controllers/shot'

const router = new Router()

router.post('/shot', shot.addShot)

export default router
