import express from 'express'
import {StatusCodes} from 'http-status-codes'
import {orderitemValidation} from '../../validations/orderitemValidation.js'
const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'Get all order items' }))
  .post(orderitemValidation.createNew)

Router.route('/:id')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: `Get order item ${req.params.id}` }))
  .put((req, res) => res.status(StatusCodes.OK).json({ message: `Update order item ${req.params.id}` }))
  .delete((req, res) => res.status(StatusCodes.NO_CONTENT).json({ message: `Delete order item ${req.params.id}` }))

export const orderitemRoute = Router