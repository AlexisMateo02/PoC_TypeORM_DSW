import { Router } from 'express'
import { controllerTag } from './tag.controller.js'
import { sanitizeTagInput, validateCreateInput, validateUpdateInput } from './tag.middleware.js'

export const tagRouter = Router()

tagRouter.get('/', controllerTag.findAll)
tagRouter.get('/:id', controllerTag.findOne)
tagRouter.post('/', sanitizeTagInput, validateCreateInput, controllerTag.add)
tagRouter.put('/:id', sanitizeTagInput, validateUpdateInput, controllerTag.update)
tagRouter.delete('/:id', controllerTag.remove)
