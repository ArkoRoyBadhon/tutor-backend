import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ILoginUser, ILoginUserResponse, IUser } from './auth.interface'
import { User } from './auth.model'
import config from '../../../config'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { Secret } from 'jsonwebtoken'

const createUser = async (payload: IUser): Promise<IUser> => {
  console.log('real Data', payload)

  const existingUser = await User.findOne({
    email: payload?.email,
  })

  if (existingUser) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'User is already exists')
  }

  const info = { ...payload, role: 'user' }
  //   console.log('info', info)

  const result = await User.create(info)
  return result
}

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload

  const NormalUser = await User.findOne({ email })

  const id = NormalUser?.id

  const isUserExist = await User.isUserExist(id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // create access token & refresh token
  const { _id: Id } = isUserExist
  const role = isUserExist?.role || 'user'
  const accessToken = jwtHelpers.createToken(
    { Id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    { Id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const getLoggedUser = async (token: string) => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid access Token')
  }
  const { Id } = verifiedToken

  const isUserExist = await User.isUserExist(Id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  const result = await User.findOne({ _id: Id })

  return result
}

const getAllUser = async (token: string) => {
  console.log(token)
  const result = await User.find({})
  return result
}

const updateUser = async (
  id: string,
  payload: IUser,
): Promise<IUser | null> => {
  const existingUser = await User.findOne({
    _id: id,
  })

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'No User exists')
  }

  // const info = { ...payload, role: 'user' }
  //   console.log('info', info)

  const result = await User.findByIdAndUpdate(id, payload, { new: true })
  return result
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteUser = async (id: string, token: string) => {
  console.log('service', id)

  const existingUser = await User.findOne({
    _id: id,
  })

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'No User exists')
  }

  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserService = {
  createUser,
  loginUser,
  getLoggedUser,
  getAllUser,
  updateUser,
  deleteUser,
}
