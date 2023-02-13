import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createAbouts, getAbouts, editAbouts } from '../controllers/abouts.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createAbouts)
router.get('/', jwt, admin, getAbouts)
router.patch('/', content('multipart/form-data'), jwt, admin, upload, editAbouts)

export default router
