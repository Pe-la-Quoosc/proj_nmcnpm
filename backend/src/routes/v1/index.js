import express from 'express'

import { adminRoutes } from './adminRoutes.js'
import { userRoutes } from './userRoutes.js'
import { productRoutes } from './productRoutes.js'
import { categoryRoutes } from './categoryRoutes.js'
import { reviewRoutes } from './reviewRoutes.js'
import { cartRoutes } from './cartRoutes.js'
import { cartitemRoutes } from './cartitemRoutes.js'
import { orderRoutes } from './orderRoutes.js'
import { orderitemRoutes } from './orderitemRoutes.js'
import { paymentRoutes } from './paymentRoutes.js'
import { profileRoutes } from './profileRoutes.js'
import { articleRoutes } from './articleRoutes.js'

const Router = express.Router()

Router.use('/admins', adminRoutes)
Router.use('/users', userRoutes)
Router.use('/products', productRoutes)
Router.use('/categories', categoryRoutes)
Router.use('/reviews', reviewRoutes)
Router.use('/carts', cartRoutes)
Router.use('/cartitems', cartitemRoutes)
Router.use('/orders', orderRoutes)
Router.use('/orderitems', orderitemRoutes)
Router.use('/payments', paymentRoutes)
Router.use('/profiles', profileRoutes)
Router.use('/articles', articleRoutes)

export const APIs_V1 = Router
