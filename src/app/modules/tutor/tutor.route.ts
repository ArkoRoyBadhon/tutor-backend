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
  '/get-available',
  // authPermission(ENUM_USER_ROLE.ADMIN),
  tutorController.getAvailableService,
)

router.get(
  '/get-upcoming',
  // authPermission(ENUM_USER_ROLE.ADMIN),
  tutorController.getUpcomingService,
)

router.get(
  '/get/:id',
  // authPermission(ENUM_USER_ROLE.ADMIN),
  tutorController.getSingleService,
)

router.patch(
  '/update/:id',
  authPermission('admin'),
  tutorController.updateService,
)

router.delete(
  '/delete/:id',
  authPermission('admin'),
  tutorController.deleteService,
)

export const tutorRoutes = router
