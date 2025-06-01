import joi from 'joi'
import {StatusCodes} from 'http-status-codes'

const createNew = async(req, res, next) => {
    const correctCondition = joi.object({
        userid: joi.number().integer().required(),
        adress: joi.string().trim().max(255).required(),
        orderDate: joi.date().iso().required(),
        totalPrice: joi.number().integer().min(0).required(),
        status: joi.string().trim().max(50).required()
    })
    try{
        console.log(req.body)
        await correctCondition.validateAsync(req.body, {
            abortEarly: false, // to return all validation errors
        })
        console.log('Validation successful')
        res.status(StatusCodes.CREATED).json({ message: 'Validation: Order created successfully' })
    }catch(error) {
        console.error(error)
        console.log(new Error(error))
        res.status(  StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message
        })
    }
}

export const orderValidation = {
    createNew
}   

