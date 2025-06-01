import express from 'express'
import {StatusCodes} from 'http-status-codes'
import { orderValidation } from '../../validations/orderValidation.js'

const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'Get all orders' }))
  .post(orderValidation.createNew)


Router.route('/:id')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: `Get order ${req.params.id}` }))
  .put((req, res) => res.status(StatusCodes.OK).json({ message: `Update order ${req.params.id}` }))
  .delete((req, res) => res.status(StatusCodes.NO_CONTENT).json({ message: `Delete order ${req.params.id}` }))

export const orderRoute = Router