import express from 'express'
import {StatusCodes} from 'http-status-codes'
import { userValidation } from '../../validations/userValidation.js'

const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'Get all users' }))
  .post(userValidation.createNew)

Router.route('/:id')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: `Get user ${req.params.id}` }))
  .put((req, res) => res.status(StatusCodes.OK).json({ message: `Update user ${req.params.id}` }))
  .delete((req, res) => res.status(StatusCodes.NO_CONTENT).json({ message: `Delete user ${req.params.id}` }))

export const userRoute = Router