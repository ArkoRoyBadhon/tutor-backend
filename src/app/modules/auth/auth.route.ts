import express from 'express'
import { UserController } from './auth.controller'
import authPermission from '../../middlewares/auth'

const router = express.Router()

router.post('/signup', UserController.createUser)
router.post('/login', UserController.loginUser)
// router.get('/user', UserController.getUser)
router.get('/user', authPermission('user', 'admin'), UserController.getUser)
router.post('/logout', UserController.LogOut)
router.get('/get-all-user', authPermission('admin'), UserController.getAllUser)

export const UserRoutes = router
