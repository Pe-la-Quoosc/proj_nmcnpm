import express from 'express'
import {StatusCodes} from 'http-status-codes'
import { reviewValidation } from '../../validations/reviewValidation.js'
const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'Get all reviews' }))
  .post(reviewValidation.createNew)

Router.route('/:id')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: `Get review ${req.params.id}` }))
  .put((req, res) => res.status(StatusCodes.OK).json({ message: `Update review ${req.params.id}` }))
  .delete((req, res) => res.status(StatusCodes.NO_CONTENT).json({ message: `Delete review ${req.params.id}` }))

export const reviewRoute = Router