import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { tutorService } from './tutor.service'
import pick from '../../../shared/pick'
import { tutorFilterOptions } from './tutor.constant'
import { paginationFields } from '../../../constant/pagination'

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await tutorService.insertIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully!',
    data: result,
  })
})

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, tutorFilterOptions)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await tutorService.getAllServices(filters, paginationOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  })
})

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await tutorService.getSingleService(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  })
})

// const getReviewsByService = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id
//   const result = await tutorService.getReviewsByService(id)

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Review retrieved successfully!',
//     data: result,
//   })
// })

const updateService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  console.log('id', id, 'data', payload)

  const result = await tutorService.updateService(id, payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Updated successfully!',
    data: result,
  })
})

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  console.log('del', id)

  const result = await tutorService.deleteService(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Deleted successfully!',
    data: result,
  })
})

export const tutorController = {
  insertIntoDB,
  getAllServices,
  getSingleService,
  //   getReviewsByService,
  updateService,
  deleteService,
}
