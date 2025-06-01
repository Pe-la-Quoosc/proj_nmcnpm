import joi from 'joi'
import {StatusCodes} from 'http-status-codes'

const createNew = async(req, res, next) => {
    const correctCondition = joi.object({
        orderId: joi.number().integer().required(),
        paymentID: joi.number().integer().required(),
        paymentstyle: joi.string().trim().max(100).required()
    })
    try{
        console.log(req.body)
        await correctCondition.validateAsync(req.body, {
            abortEarly: false, // to return all validation errors
        })
        console.log('Validation successful')
        res.status(StatusCodes.CREATED).json({ message: 'Validation: Payment created successfully' })
    }catch(error) {
        console.error(error)
        console.log(new Error(error))
        res.status(  StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message
        })
    }
}

export const paymentValidation = {
    createNew
}   

