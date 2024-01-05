/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { ITutor } from './tutor.interface'

const TutorSchema = new Schema<ITutor>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    class: {
      type: [String],
      required: true,
    },
    subject: {
      type: [String],
      required: true,
    },
    education: {
      type: [String],
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    address: {
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

// export const Tutor = model<ITutor, Record<string,unknown>>('Tutor', TutorSchema)
export const Tutor = model<ITutor>('Tutor', TutorSchema)
