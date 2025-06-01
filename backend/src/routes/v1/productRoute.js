import express from 'express'
import {StatusCodes} from 'http-status-codes'
import { productValidation } from '../../validations/productValidation.js'
const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'Get all products' }))
  .post(productValidation.createNew)

Router.route('/:id')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: `Get product ${req.params.id}` }))
  .put((req, res) => res.status(StatusCodes.OK).json({ message: `Update product ${req.params.id}` }))
  .delete((req, res) => res.status(StatusCodes.NO_CONTENT).json({ message: `Delete product ${req.params.id}` }))

export const productRoute = Router