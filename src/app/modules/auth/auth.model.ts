/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './auth.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordConfirm: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

UserSchema.statics.isUserExist = async function (
  userId: string,
): Promise<Pick<IUser, '_id' | 'email' | 'name' | 'password'> | null> {
  return await User.findOne({ _id: userId }, { _id: 1, password: 1, role: 1 })
}

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

UserSchema.pre('save', async function (next) {
  const user = this
  if (user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bycrypt_salt_rounds),
    )
  }
  next()
})

export const User = model<IUser, UserModel>('User', UserSchema)
