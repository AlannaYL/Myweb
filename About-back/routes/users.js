import { Router } from 'express'
import content from '../middleware/content.js'
import { register, createUser } from '../controllers/users.js'

const router = Router()

router.post('/', content('application/json'), register)
router.post('/', createUser)

export default router
