import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Category } from './category.entity.js'

const em = orm.manager

async function findAll(req: Request, res: Response) {
	try {
		const categories = await em.find(Category)
		res.status(200).json({ message: 'Found all categories', data: categories })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

async function findOne(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const category = await em.findOneOrFail(Category, { where: { id } })
		res.status(200).json({ message: 'Found category', data: category })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: create + save (MikroORM: create + flush)
async function add(req: Request, res: Response) {
	try {
		const category = em.create(Category, req.body)
		await em.save(category)
		res.status(201).json({ message: 'Category created', data: category })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: findOneOrFail + merge + save (MikroORM: getReference + assign + flush)
async function update(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const category = await em.findOneOrFail(Category, { where: { id } })
		em.merge(Category, category, req.body)
		await em.save(category)
		res.status(200).json({ message: 'Category updated' })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: delete directo por ID (MikroORM: getReference + removeAndFlush (remove + flush))
async function remove(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		await em.delete(Category, { id })
		res.status(200).json({ message: 'Category deleted' })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const controllerCategory = {
	findAll,
	findOne,
	add,
	update,
	remove,
}
