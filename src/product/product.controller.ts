import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { In } from 'typeorm'
import { Product } from './product.entity.js'
import { Category } from '../category/category.entity.js'
import { Tag } from '../tag/tag.entity.js'

const em = orm.manager

function sanitizeProductInput(req: Request, res: Response, next: NextFunction) {
	req.body.sanitizedInput = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		stock: req.body.stock,
		category: req.body.category,
		tags: req.body.tags,
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
		const products = await em.find(Product, { relations: ['category', 'tags'] })
		res.status(200).json({ message: 'Found all products', data: products })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

async function findOne(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const product = await em.findOneOrFail(Product, { where: { id }, relations: ['category', 'tags'] })
		res.status(200).json({ message: 'Found product', data: product })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: create + save (MikroORM: create + flush)
async function add(req: Request, res: Response) {
	try {
		const { category: categoryId, tags: tagIds, ...productData } = req.body.sanitizedInput
		const product = em.create(Product, productData)
		if (categoryId !== undefined) {
			const category = await em.findOne(Category, { where: { id: categoryId } })
			if (!category) {
				return res.status(400).json({ message: 'Category not found' })
			}
			product.category = category
		}
		if (tagIds !== undefined && Array.isArray(tagIds)) {
			const tags = await em.findBy(Tag, { id: In(tagIds) })
			if (tags.length !== tagIds.length) {
				return res.status(400).json({ message: 'Some tags not found' })
			}
			product.tags = tags
		}
		await em.save(product)
		res.status(201).json({ message: 'Product created', data: product })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: findOneOrFail + merge + save (MikroORM: findOneOrFail + assign + flush)
async function update(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const { category: categoryId, tags: tagIds, ...productData } = req.body.sanitizedInput
		const productToUpdate = await em.findOneOrFail(Product, { where: { id } })
		em.merge(Product, productToUpdate, productData)
		if (categoryId !== undefined) {
			const category = await em.findOne(Category, { where: { id: categoryId } })
			if (!category) {
				return res.status(400).json({ message: 'Category not found' })
			}
			productToUpdate.category = category
		}
		if (tagIds !== undefined && Array.isArray(tagIds)) {
			const tags = await em.findBy(Tag, { id: In(tagIds) })
			if (tags.length !== tagIds.length) {
				return res.status(400).json({ message: 'Some tags not found' })
			}
			productToUpdate.tags = tags
		}
		await em.save(productToUpdate)
		res.status(200).json({ message: 'Product updated' })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: delete directo por ID (MikroORM: getReference + removeAndFlush (remove + flush))
async function remove(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		await em.delete(Product, { id })
		res.status(200).json({ message: 'Product deleted' })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const controllerProduct = {
	sanitizeProductInput,
	findAll,
	findOne,
	add,
	update,
	remove,
}
