import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'
import { UserService } from './auth.service'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { confirmPassword, ...userData } = req.body

  console.log(userData)

  if (userData?.password !== confirmPassword) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'password not matched')
  }

  const result = await UserService.createUser(userData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id, ...userData } = req.body

  const result = await UserService.updateUser(id, userData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated Successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  // console.log(loginData)

  const result = await UserService.loginUser(loginData)
  const { refreshToken, accessToken, ...others } = result

  console.log(result)

  const cookieOptions = {
    secure: config.env === 'development',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)
  res.cookie('accessToken', accessToken, cookieOptions)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged In successfully !',
    data: others,
  })
})

const LogOut = catchAsync(async (req: Request, res: Response) => {
  const cookieOptions = {
    secure: process.env.NODE_ENV === 'development',
    httpOnly: true,
    expires: new Date(0),
  }

  res.cookie('refreshToken', '', cookieOptions)
  res.cookie('accessToken', '', cookieOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged out Successfully',
  })
})

const getUser = catchAsync(async (req: Request, res: Response) => {
  const authorizationHeader = req.cookies.accessToken

  if (typeof authorizationHeader === 'string') {
    const token = authorizationHeader.split(' ')[1] || authorizationHeader
    const result = await UserService.getLoggedUser(token)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Get Successfully',
      data: result,
    })
  }
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const authorizationHeader = req.cookies.accessToken

  if (typeof authorizationHeader === 'string') {
    const token = authorizationHeader.split(' ')[1] || authorizationHeader
    const result = await UserService.getAllUser(token)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Get Successfully',
      data: result,
    })
  }
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const authorizationHeader = req.cookies.accessToken
  const { id } = req.body

  console.log('delete id', id)

  if (typeof authorizationHeader === 'string') {
    const token = authorizationHeader.split(' ')[1] || authorizationHeader
    const result = await UserService.deleteUser(id, token)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted Successfully',
      data: result,
    })
  }
})

export const UserController = {
  createUser,
  updateUser,
  loginUser,
  LogOut,
  getUser,
  getAllUser,
  deleteUser,
}
