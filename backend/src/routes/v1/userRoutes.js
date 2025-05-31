import express from 'express'
import {StatusCodes} from 'http-status-codes'

const Router = express.Router()

Router.route('/users')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'Get all users' }))
  .post((req, res) => res.status(StatusCodes.CREATED).json({ message: 'Create new user' }))

Router.route('/users/:id')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: `Get user ${req.params.id}` }))
  .put((req, res) => res.status(StatusCodes.OK).json({ message: `Update user ${req.params.id}` }))
  .delete((req, res) => res.status(StatusCodes.NO_CONTENT).json({ message: `Delete user ${req.params.id}` }))

export const boardRoutes = Router