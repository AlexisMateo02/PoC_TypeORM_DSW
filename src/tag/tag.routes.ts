import { Router } from 'express'
import { controllerTag } from './tag.controller.js'

export const tagRouter = Router()

tagRouter.get('/', controllerTag.findAll)
tagRouter.get('/:id', controllerTag.findOne)
tagRouter.post('/', controllerTag.add)
tagRouter.put('/:id', controllerTag.update)
tagRouter.delete('/:id', controllerTag.remove)
