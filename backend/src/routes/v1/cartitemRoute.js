import express from 'express'
import {StatusCodes} from 'http-status-codes'
import { cartitemValidation } from '../../validations/cartitemValidation.js'
const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'Get all cart items' }))
  .post(cartitemValidation.createNew)

Router.route('/:id')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: `Get cart item ${req.params.id}` }))
  .put((req, res) => res.status(StatusCodes.OK).json({ message: `Update cart item ${req.params.id}` }))
  .delete((req, res) => res.status(StatusCodes.NO_CONTENT).json({ message: `Delete cart item ${req.params.id}` }))

export const cartitemRoute = Router