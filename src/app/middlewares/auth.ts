import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'

const authPermission = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ff = req.cookies
      // const token = req.headers.authorization
      const token = ff.accessToken
      console.log('roleee', requiredRoles)

      console.log('cookies', token)

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      let verifiedUser = null

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)

      req.user = verifiedUser

      console.log('AAA', verifiedUser.role)

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default authPermission
