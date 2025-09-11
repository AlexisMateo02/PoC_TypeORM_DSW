import { Request, Response } from 'express'
import { AppDataSource } from '../shared/db/orm.js'
import { In } from 'typeorm'
import { error, success } from '../shared/errors/httpResponses.js'
import { Product } from './product.entity.js'
import { Category } from '../category/category.entity.js'
import { Tag } from '../tag/tag.entity.js'
import { createProduct } from './product.service.js'

const em = AppDataSource.manager

async function findAll(req: Request, res: Response) {
	try {
		const products = await em.find(Product, { relations: ['category', 'tags'] })
		res.status(200).json({ message: 'All products found', data: products })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

async function findOne(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const product = await em.findOneOrFail(Product, { where: { id }, relations: ['category', 'tags'] })
		res.status(200).json({ message: 'Product found', data: product })
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

//! TypeORM: create + save (MikroORM: create + flush)
async function add(req: Request, res: Response) {
  try {
    const productData = req.body.sanitizedInput
    const product = await createProduct(productData)
    return success.Created(res, 'Product created successfully', product)
  } catch (err: any) {
    if (err.message === 'Category not found') {
      return error.NotFound(res, err.message)
    }
    if (err.message.includes('Tags not found')) {
      return error.NotFound(res, err.message)
    }
    console.error('Error creating product:', err)
    return error.InternalServerError(res, 'Failed to create product')
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
	findAll,
	findOne,
	add,
	update,
	remove,
}
