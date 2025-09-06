import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Tag } from './tag.entity.js'

const em = orm.manager

async function findAll(req: Request, res: Response) {
	try {
		const tags = await em.find(Tag)
		res.status(200).json({ message: 'Found all tags', data: tags })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

async function findOne(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const tag = await em.findOneOrFail(Tag, { where: { id } })
		res.status(200).json({ message: 'Found tag', data: tag })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: create + save (MikroORM: create + flush)
async function add(req: Request, res: Response) {
	try {
		const tag = em.create(Tag, req.body)
		await em.save(tag)
		res.status(201).json({ message: 'Tag created', data: tag })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: findOneOrFail + merge + save (MikroORM: getReference + assign + flush)
async function update(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const tag = await em.findOneOrFail(Tag, { where: { id } })
		em.merge(Tag, tag, req.body)
		await em.save(tag)
		res.status(200).json({ message: 'Tag updated' })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: delete directo por ID (MikroORM: getReference + removeAndFlush (remove + flush))
async function remove(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		await em.delete(Tag, { id })
		res.status(200).json({ message: 'Tag deleted' })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const controllerTag = {
	findAll,
	findOne,
	add,
	update,
	remove,
}
