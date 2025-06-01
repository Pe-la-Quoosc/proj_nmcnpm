import express from 'express'

import { adminRoute } from './adminRoute.js'
import { userRoute } from './userRoute.js'
import { productRoute } from './productRoute.js'
import { reviewRoute } from './reviewRoute.js'
import { cartRoute } from './cartRoute.js'
import { cartitemRoute } from './cartitemRoute.js'
import { orderRoute } from './orderRoute.js'
import { orderitemRoute } from './orderitemRoute.js'
import { paymentRoute } from './paymentRoute.js'
import { articleRoute } from './articleRoute.js'

const Router = express.Router()

Router.use('/admins', adminRoute)
Router.use('/users', userRoute)
Router.use('/products', productRoute)
Router.use('/reviews', reviewRoute)
Router.use('/carts', cartRoute)
Router.use('/cartitems', cartitemRoute)
Router.use('/orders', orderRoute)
Router.use('/orderitems', orderitemRoute)
Router.use('/payments', paymentRoute)
Router.use('/articles', articleRoute)

export const APIs_V1 = Router
