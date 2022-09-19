import { StatusCodes } from 'http-status-codes'

export const ok = (msg?: string, data?: any): any => ({
  code: StatusCodes.OK,
  msg,
  data
})

export const unprocessableEntity = (msg?: string, data?: any): any => ({
  code: StatusCodes.UNPROCESSABLE_ENTITY,
  msg,
  data
})