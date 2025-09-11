import { Router } from 'express'
import { controllerProduct } from './product.controller.js'
import { sanitizeProductInput, validateProductInput } from './product.middleware.js'

export const productRouter = Router()

productRouter.get('/', controllerProduct.findAll)
productRouter.get('/:id', controllerProduct.findOne)
productRouter.post('/', sanitizeProductInput, validateProductInput, controllerProduct.add)
productRouter.put('/:id', sanitizeProductInput, validateProductInput, controllerProduct.update)
productRouter.patch('/:id', sanitizeProductInput, validateProductInput, controllerProduct.update)
productRouter.delete('/:id', controllerProduct.remove)
