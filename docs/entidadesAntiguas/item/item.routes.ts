import { Router } from 'express'
import { controllerItem } from '../item/item.controller.js'

export const itemRouter = Router()

itemRouter.get('/', controllerItem.findAll)
itemRouter.get('/:id', controllerItem.findOne)
itemRouter.post('/', controllerItem.add)
itemRouter.put('/:id', controllerItem.update)
itemRouter.delete('/:id', controllerItem.remove)
