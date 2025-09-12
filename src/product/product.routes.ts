import { Router } from 'express'
import { controllerProduct } from './product.controller.js'
import { sanitizeProductInput, validateCreateInput, validateUpdateInput } from './product.middleware.js'

export const productRouter = Router()

productRouter.get('/', controllerProduct.findAll)
productRouter.get('/:id', controllerProduct.findOne)
productRouter.post('/', sanitizeProductInput, validateCreateInput, controllerProduct.add)
productRouter.put('/:id', sanitizeProductInput, validateUpdateInput, controllerProduct.update)
productRouter.delete('/:id', controllerProduct.remove)
