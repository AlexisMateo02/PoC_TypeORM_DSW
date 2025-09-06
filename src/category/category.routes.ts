import { Router } from 'express'
import { controllerCategory } from './category.controller.js'

export const categoryRouter = Router()

categoryRouter.get('/', controllerCategory.findAll)
categoryRouter.get('/:id', controllerCategory.findOne)
categoryRouter.post('/', controllerCategory.add)
categoryRouter.put('/:id', controllerCategory.update)
categoryRouter.delete('/:id', controllerCategory.remove)
