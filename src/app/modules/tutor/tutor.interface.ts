// import { Types } from "mongoose"

export type ITutor = {
  // _id?: Types.ObjectId
  name: string
  img: string
  email: string
  phoneNumber: string
  gender: string
  class: string[]
  subject: string[]
  education: string[]
  experience: string
  address: string
  status: string
}

export type IOption = {
  searchTerm?: string | undefined
  name?: string
  email?: string
  phoneNumber?: string
  class?: string[]
  gender?: string
  subject?: string[]
  education?: string[]
  experience?: string
}
