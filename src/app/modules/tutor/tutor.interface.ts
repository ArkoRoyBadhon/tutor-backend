// import { Types } from "mongoose"

export type ITutor = {
  // _id?: Types.ObjectId
  name: string
  email: string
  phoneNumber: string
  gender: string
  class: string[]
  subject: string[]
  education: string[]
  experience: string
  address: string
}
