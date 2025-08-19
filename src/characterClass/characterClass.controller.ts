import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { CharacterClass } from '../characterClass/characterClass.entity.js'

const em = orm.manager

async function findAll(req: Request, res: Response) {
	try {
		const characterClasses = await em.find(CharacterClass)
		res.status(200).json({ message: 'Found all character classes', data: characterClasses })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

async function findOne(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const characterClass = await em.findOneOrFail(CharacterClass, { where: { id } })
		res.status(200).json({ message: 'Found character class', data: characterClass })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: create + save (MikroORM: create + flush)
async function add(req: Request, res: Response) {
	try {
		const characterClass = em.create(CharacterClass, req.body)
		await em.save(characterClass)
		res.status(201).json({ message: 'Character class created', data: characterClass })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: findOneOrFail + merge + save (MikroORM: getReference + assign + flush)
async function update(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const characterClass = await em.findOneOrFail(CharacterClass, { where: { id } })
		em.merge(CharacterClass, characterClass, req.body)
		await em.save(characterClass)
		res.status(200).json({ message: 'Character class updated' })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: delete directo por ID (MikroORM: getReference + removeAndFlush (remove + flush))
async function remove(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		await em.delete(CharacterClass, { id })
		res.status(200).json({ message: 'Character class deleted' })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const controllerCharacterClass = {
	findAll,
	findOne,
	add,
	update,
	remove,
}
