import { Model, Types } from 'mongoose'

export type ILoginUser = {
  email: string
  password: string
}

export type ILoginUserResponse = {
  accessToken: string
  refreshToken?: string
}

export type IRefreshTokenresponse = {
  accessToken: string
}

export type UserName = {
  firstName: string
  lastName: string
}

export type IUser = {
  _id?: Types.ObjectId
  password: string
  // name: UserName
  name: string
  address: string
  email: string
  role: string
  passwordConfirm: string
}

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, '_id' | 'email' | 'name' | 'password'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<IUser>
