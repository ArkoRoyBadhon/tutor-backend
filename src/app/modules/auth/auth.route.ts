import express from 'express'
import { UserController } from './auth.controller'
import authPermission from '../../middlewares/auth'

const router = express.Router()

router.post('/signup', UserController.createUser)
router.post('/login', UserController.loginUser)
router.get('/user', authPermission('user', 'admin'), UserController.getUser)
router.post('/logout', UserController.LogOut)

export const UserRoutes = router
