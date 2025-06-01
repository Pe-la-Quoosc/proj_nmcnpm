import express from 'express'
import {StatusCodes} from 'http-status-codes'
const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'Get all admins' }))
  .post((req, res) => res.status(StatusCodes.CREATED).json({ message: 'Create new admin' }))

Router.route('/:id')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: `Get admin ${req.params.id}` }))
  .put((req, res) => res.status(StatusCodes.OK).json({ message: `Update admin ${req.params.id}` }))
  .delete((req, res) => res.status(StatusCodes.NO_CONTENT).json({ message: `Delete admin ${req.params.id}` }))

export const adminRoute = Router