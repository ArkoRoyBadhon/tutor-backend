import { ITutor } from './tutor.interface'
import { Tutor } from './tutor.model'

const insertIntoDB = async (data: ITutor): Promise<ITutor | null> => {
  const result = await Tutor.create(data)
  return result
}

const getAllServices = async (): Promise<Partial<ITutor>[] | null> => {
  try {
    const result = await Tutor.find()
    return result
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
