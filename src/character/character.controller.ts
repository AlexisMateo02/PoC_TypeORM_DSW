import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { In } from 'typeorm'
import { Character } from './character.entity.js'
import { CharacterClass } from '../characterClass/characterClass.entity.js'
import { Item } from '../item/item.entity.js'

const em = orm.manager

function sanitizeCharacterInput(req: Request, res: Response, next: NextFunction) {
	req.body.sanitizedInput = {
		name: req.body.name,
		characterClass: req.body.characterClass,
		level: req.body.level,
		hp: req.body.hp,
		mana: req.body.mana,
		attack: req.body.attack,
		items: req.body.items,
	}
	//more checks here
	Object.keys(req.body.sanitizedInput).forEach(key => {
		if (req.body.sanitizedInput[key] === undefined) {
			delete req.body.sanitizedInput[key]
		}
	})
	next()
}

async function findAll(req: Request, res: Response) {
	try {
		const characters = await em.find(Character, { relations: ['characterClass', 'items'] })
		res.status(200).json({ message: 'Found all characters', data: characters })
	}
	catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

async function findOne(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const character = await em.findOneOrFail(Character, { where: { id }, relations: ['characterClass', 'items'] })
		res.status(200).json({ message: 'Found character', data: character })
	}
	catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: create + save (MikroORM: create + flush)
async function add(req: Request, res: Response) {
	try {
		const { characterClass: characterClassId, items: itemIds, ...characterData } = req.body.sanitizedInput
		const character = em.create(Character, characterData)
		if (characterClassId  !== undefined) {
			const characterClass = await em.findOne(CharacterClass, { where: { id: characterClassId } })
			if (!characterClass) {
				return res.status(400).json({ message: 'CharacterClass not found' })
			}
			character.characterClass = characterClass
		}
		if (itemIds !== undefined && Array.isArray(itemIds)) {
    	const items = await em.findBy(Item, { id: In(itemIds) })
    	if (items.length !== itemIds.length) {
        return res.status(400).json({ message: 'Some items not found' })
    	}
    character.items = items
		}
		await em.save(character)
		res.status(201).json({ message: 'Character created', data: character })
	}
	catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: findOneOrFail + merge + save (MikroORM: findOneOrFail + assign + flush)
async function update(req: Request, res: Response) {
	try{
		const id = Number.parseInt(req.params.id)
		const { characterClass: characterClassId, items: itemIds, ...characterData } = req.body.sanitizedInput
		const characterToUpdate = await em.findOneOrFail(Character, { where: { id } })
		em.merge(Character, characterToUpdate, characterData)
		if (characterClassId  !== undefined) {
			const characterClass = await em.findOne(CharacterClass, { where: { id: characterClassId } })
			if (!characterClass) {
				return res.status(400).json({ message: 'CharacterClass not found' })
			}
			characterToUpdate.characterClass = characterClass
		}
		if (itemIds !== undefined && Array.isArray(itemIds)) {
    	const items = await em.findBy(Item, { id: In(itemIds) })
    	if (items.length !== itemIds.length) {
        return res.status(400).json({ message: 'Some items not found' })
    	}
    characterToUpdate.items = items
		}
		await em.save(characterToUpdate)
		res.status(200).json({ message: 'Character updated' })
	}
	catch (error: any){
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: delete directo por ID (MikroORM: getReference + removeAndFlush (remove + flush))
async function remove(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		await em.delete(Character, { id })
		res.status(200).json({ message: 'Character deleted' })
	}
	catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const controllerCharacter = {
	sanitizeCharacterInput,
	findAll,
	findOne,
	add,
	update,
	remove,
}
