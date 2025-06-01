import express from 'express'
import {StatusCodes} from 'http-status-codes'
import { cartValidation } from '../../validations/cartValidation.js'
const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'Get all carts' }))
  .post(cartValidation.createNew)

Router.route('/:id')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: `Get cart ${req.params.id}` }))
  .put((req, res) => res.status(StatusCodes.OK).json({ message: `Update cart ${req.params.id}` }))
  .delete((req, res) => res.status(StatusCodes.NO_CONTENT).json({ message: `Delete cart ${req.params.id}` }))

export const cartRoute = Router