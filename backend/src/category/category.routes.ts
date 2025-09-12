import { Router } from 'express'
import { controllerCategory } from './category.controller.js'
import { sanitizeCategoryInput, validateCreateInput, validateUpdateInput } from './category.middleware.js'

export const categoryRouter = Router()

categoryRouter.get('/', controllerCategory.findAll)
categoryRouter.get('/:id', controllerCategory.findOne)
categoryRouter.post('/', sanitizeCategoryInput, validateCreateInput, controllerCategory.add)
categoryRouter.put('/:id', sanitizeCategoryInput, validateUpdateInput, controllerCategory.update)
categoryRouter.delete('/:id', controllerCategory.remove)
