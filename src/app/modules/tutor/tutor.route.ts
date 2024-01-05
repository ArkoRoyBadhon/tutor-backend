/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express'
import { tutorController } from './tutor.controller'
import authPermission from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create',
  authPermission('user', 'admin'),
  tutorController.insertIntoDB,
)
router.get(
  '/get-all',
  // authPermission(ENUM_USER_ROLE.ADMIN),
  tutorController.getAllServices,
)

router.get(
  '/get/:id',
  // authPermission(ENUM_USER_ROLE.ADMIN),
  tutorController.getSingleService,
)

router.patch(
  '/update/:id',
  // authPermission(ENUM_USER_ROLE.ADMIN),
  tutorController.updateService,
)

router.delete(
  '/delete/:id',
  // authPermission(ENUM_USER_ROLE.ADMIN),
  tutorController.deleteService,
)

export const tutorRoutes = router
