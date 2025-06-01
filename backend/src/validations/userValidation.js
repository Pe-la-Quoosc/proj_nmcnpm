import joi  from  'joi'
import {StatusCodes} from 'http-status-codes'

const createNew = async(req, res, next) => {
    const correctCondition = joi.object({
        name: joi.string().min(3).max(30).required().trim().strict(),
        email: joi.string().email().required().trim().strict(),
        password: joi.string().min(6).required(),
        role: joi.string().valid('admin', 'user').required(),
        phone: joi.string().trim().max(20),
        address: joi.string().trim().max(255),
        avatar: joi.string().uri().trim()
    })
    try{
        console.log(req.body)
        await correctCondition.validateAsync(req.body, {
            abortEarly: false, // to return all validation errors
        })
        console.log('Validation successful')
        res.status(StatusCodes.CREATED).json({ message: 'Validation: User created successfully' })
    }catch(error) {
        console.error(error)
        console.log(new Error(error))
        res.status(  StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message
        })
    }
}

export const userValidation = {
    createNew
}   

