import Joi from 'joi'
import { HttpStatusCode } from '*/utilities/constants'

const getPlacesTextSearch = async (req, res, next) => {
  const condition = Joi.object({
    // 'query', 'radius', 'language', 'location', 'maxprice', 'minprice', 'opennow', 'pagetoken', 'region', 'type', 'key'
    query: Joi.string().min(2).max(50).trim(),
    radius: Joi.string().min(3).max(5).trim(),
    location: Joi.object(),
    maxprice: Joi.string().min(2).max(50).trim(),
    minprice: Joi.string().min(2).max(50).trim(),
    opennow: Joi.string().min(2).max(50).trim(),
    pagetoken: Joi.string().trim(),
    type: Joi.string().min(2).max(50).trim()
  })
  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message
    })
  }
}

// const createNew = async (req, res, next) => {
//   const condition = Joi.object({
//     query: Joi.string().min(2).max(50).trim()
//   })
//   try {
//     await condition.validateAsync(req.body, { abortEarly: false })
//     next()
//   } catch (error) {
//     res.status(HttpStatusCode.BAD_REQUEST).json({
//       errors: new Error(error).message
//     })
//   }
// }

// const update = async (req, res, next) => {
//   const condition = Joi.object({
//     // sth
//   })
//   try {
//     await condition.validateAsync(req.body, {
//       abortEarly: false,
//       allowUnknown: true
//     })
//     next()
//   } catch (error) {
//     res.status(HttpStatusCode.BAD_REQUEST).json({
//       errors: new Error(error).message
//     })
//   }
// }

export const MapValidation = {
  getPlacesTextSearch
  // createNew,
  // update
}
