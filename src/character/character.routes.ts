import { Router } from 'express'
import { controllerCharacter } from './character.controller.js'

export const characterRouter = Router()

characterRouter.get('/', controllerCharacter.findAll)
characterRouter.get('/:id', controllerCharacter.findOne)
characterRouter.post('/', controllerCharacter.sanitizeCharacterInput, controllerCharacter.add)
characterRouter.put('/:id', controllerCharacter.sanitizeCharacterInput, controllerCharacter.update)
characterRouter.patch('/:id', controllerCharacter.sanitizeCharacterInput, controllerCharacter.update)
characterRouter.delete('/:id', controllerCharacter.remove)
