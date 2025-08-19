import { Router } from 'express'
import { controllerCharacterClass } from '../characterClass/characterClass.controller.js'

export const characterClassRouter = Router()

characterClassRouter.get('/', controllerCharacterClass.findAll)
characterClassRouter.get('/:id', controllerCharacterClass.findOne)
characterClassRouter.post('/', controllerCharacterClass.add)
characterClassRouter.put('/:id', controllerCharacterClass.update)
characterClassRouter.delete('/:id', controllerCharacterClass.remove)
