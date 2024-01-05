import express from 'express'
import { UserRoutes } from '../modules/auth/auth.route'
import { tutorRoutes } from '../modules/tutor/tutor.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/tutor',
    route: tutorRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
