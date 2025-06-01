import express from 'express'
import {StatusCodes} from 'http-status-codes'
import { paymentValidation } from '../../validations/paymentValidation.js'
const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'Get all payments' }))
  .post(paymentValidation.createNew)

Router.route('/:id')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: `Get payment ${req.params.id}` }))
  .put((req, res) => res.status(StatusCodes.OK).json({ message: `Update payment ${req.params.id}` }))
  .delete((req, res) => res.status(StatusCodes.NO_CONTENT).json({ message: `Delete payment ${req.params.id}` }))

export const paymentRoute = Router