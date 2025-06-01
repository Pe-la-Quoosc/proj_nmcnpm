import joi from 'joi'
import {StatusCodes} from 'http-status-codes'

const createNew = async(req, res, next) => {
    const correctCondition = joi.object({
        name: joi.string().trim().max(255).required().trim().strict(),
        description: joi.string().trim().max(2000).required().trim().strict(),
        price: joi.number().integer().min(0).required(),
        stock: joi.number().integer().min(0).required(),
        image: joi.string().trim().uri().required(),
        categoryID: joi.number().integer().required()
    })
    try{
        console.log(req.body)
        await correctCondition.validateAsync(req.body, {
            abortEarly: false, // to return all validation errors
        })
        console.log('Validation successful')
        res.status(StatusCodes.CREATED).json({ message: 'Validation: Product created successfully' })
    }catch(error) {
        console.error(error)
        console.log(new Error(error))
        res.status(  StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message
        })
    }
}

export const productValidation = {
    createNew
}   

