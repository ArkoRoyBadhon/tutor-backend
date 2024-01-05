/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationsHelpers } from '../../../helpers/paginationHelpers'
import { IGenericResponse } from '../../../interfaces/common'
import { IOption, ITutor } from './tutor.interface'
import { Tutor } from './tutor.model'

const insertIntoDB = async (data: ITutor): Promise<ITutor | null> => {
  const result = await Tutor.create(data)
  return result
}

const getAllServices = async (
  filters: Partial<IOption>,
  paginationOptions: {
    page?: number | undefined
    limit?: number | undefined
    sortBy?: string | undefined
    sortOrder?: SortOrder | undefined
  },
): Promise<IGenericResponse<ITutor[]> | null> => {
  // console.log('aa', options)
  const andConditions: string | any[] = []
  const { searchTerm, ...filtersData } = filters
  const tutorSearchableFields = [
    'name',
    'email',
    'phoneNumber',
    'gender',
    'subject',
  ]

  try {
    if (searchTerm) {
      // if (searchTerm!.length > 0) {
      andConditions.push({
        $or: tutorSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      })
    }

    // if(filtersData!.length > 0) {
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      })
    }
    // }

    const { page, limit, skip, sortBy, sortOrder } =
      paginationsHelpers.calculatePagination(paginationOptions)

    const sortConditions: { [key: string]: SortOrder } = {}
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder
    }

    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {}

    const result = await Tutor.find(whereConditions).sort(sortConditions)
    const count = await Tutor.find({}).countDocuments()

    return {
      meta: {
        page,
        limit,
        count,
      },
      data: result,
    }
  } catch (error) {
    // Handle errors
    console.error('Error occurred:', error)
    return null
  }
}

const getSingleService = async (
  id: string,
): Promise<Partial<ITutor> | null> => {
  try {
    const result = await Tutor.findById(id)
    return result
  } catch (error) {
    // Handle errors
    console.error('Error occurred:', error)
    return null
  }
}

// const getReviewsByService = async (
//   id: string,
// ): Promise<Partial<ITutor> | null> => {
//   const result = await Tutor.findById({
//     where: {
//       id,
//     },
//   })

//   return result
// }

const updateService = async (
  id: string,
  payload: Partial<ITutor>,
): Promise<Partial<ITutor> | null> => {
  const result = await Tutor.findByIdAndUpdate(id, payload, { new: true })

  return result
}

const deleteService = async (id: string) => {
  try {
    const result = await Tutor.findByIdAndDelete(id)

    return result
  } catch (error) {
    return 'Something went wrong'
  }
}

export const tutorService = {
  insertIntoDB,
  getAllServices,
  getSingleService,
  // getReviewsByService,
  updateService, // pricing, descriptions and availability
  deleteService,
}
