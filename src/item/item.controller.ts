import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Item } from '../item/item.entity.js'

const em = orm.manager

async function findAll(req: Request, res: Response) {
	try {
		const items = await em.find(Item)
		res.status(200).json({ message: 'Found all items', data: items })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

async function findOne(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const item = await em.findOneOrFail(Item, { where: { id } })
		res.status(200).json({ message: 'Found item', data: item })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: create + save (MikroORM: create + flush)
async function add(req: Request, res: Response) {
	try {
		const item = em.create(Item, req.body)
		await em.save(item)
		res.status(201).json({ message: 'Item created', data: item })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: findOneOrFail + merge + save (MikroORM: getReference + assign + flush)
async function update(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const item = await em.findOneOrFail(Item, { where: { id } })
		em.merge(Item, item, req.body)
		await em.save(item)
		res.status(200).json({ message: 'Item updated' })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: delete directo por ID (MikroORM: getReference + removeAndFlush (remove + flush))
async function remove(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		await em.delete(Item, { id })
		res.status(200).json({ message: 'Item deleted' })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const controllerItem = {
	findAll,
	findOne,
	add,
	update,
	remove,
}
