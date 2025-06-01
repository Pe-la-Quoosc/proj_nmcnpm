import express from 'express'
import {StatusCodes} from 'http-status-codes'
import { articleValidation } from '../../validations/articleValidation.js'
const Router = express.Router()

Router.route('/')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: 'Get all articles' }))
  .post(articleValidation.createNew)

Router.route('/:id')
  .get((req, res) => res.status(StatusCodes.OK).json({ message: `Get article ${req.params.id}` }))
  .put((req, res) => res.status(StatusCodes.OK).json({ message: `Update article ${req.params.id}` }))
  .delete((req, res) => res.status(StatusCodes.NO_CONTENT).json({ message: `Delete article ${req.params.id}` }))

export const articleRoute = Router