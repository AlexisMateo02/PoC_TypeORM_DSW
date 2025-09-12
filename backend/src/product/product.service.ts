import { AppDataSource } from '../shared/db/orm.js'
import { Product } from './product.entity.js'
import { Category } from '../category/category.entity.js'
import { Tag } from '../tag/tag.entity.js'
import { In } from 'typeorm'

const em = AppDataSource.manager

interface ProductCreateData {
	name: string
	description?: string
	price: number
	stock: number
	category: number
	tags?: number[]
}

interface ProductUpdateData {
	name?: string
	description?: string | null
	price?: number
	stock?: number
	category?: number
	tags?: number[]
}

function validateId(id: number): void {
	if (!id || isNaN(id) || id <= 0) {
		throw new Error('Invalid product ID')
	}
}

//! TypeORM: find
async function getAllProducts() {
	return await em.find(Product, { relations: ['category', 'tags'] })
}

//! TypeORM: findOne
async function getProductById(id: number) {
	validateId(id)
	const product = await em.findOne(Product, {
		where: { id },
		relations: ['category', 'tags'],
	})
	if (!product) {
		throw new Error(`Product with ID ${id} not found`)
	}
	return product
}

//! TypeORM: create + save
async function createProduct(productData: ProductCreateData) {
	const { category: categoryId, tags: tagIds, ...productFields } = productData
	const product = em.create(Product, productFields)
	const category = await em.findOne(Category, { where: { id: categoryId } })
	if (!category) {
		throw new Error('Category not found')
	}
	product.category = category
	if (Array.isArray(tagIds)) {
		if (tagIds.length > 0) {
			const tags = await em.findBy(Tag, { id: In(tagIds) })
			if (tags.length !== tagIds.length) {
				const foundTagIds = tags.map(tag => tag.id)
				const missingTagIds = tagIds.filter(id => !foundTagIds.includes(id))
				throw new Error(`Tags not found: ${missingTagIds.join(', ')}`)
			}
			product.tags = tags
		} else {
			product.tags = []
		}
	}
	const existingProduct = await em.findOne(Product, {
		where: { name: productFields.name },
	})
	if (existingProduct) {
		throw new Error(`Product with name '${productFields.name}' already exists`)
	}
	await em.save(product)
	return await em.findOne(Product, {
		where: { id: product.id },
		relations: ['category', 'tags'],
	})
}

//! TypeORM: findOne + merge + save
async function updateProduct(id: number, productData: ProductUpdateData) {
	const { category: categoryId, tags: tagIds, ...productFields } = productData
	const product = await getProductById(id)
	if (categoryId !== undefined) {
		const category = await em.findOne(Category, { where: { id: categoryId } })
		if (!category) {
			throw new Error('Category not found')
		}
		product.category = category
	}
	if (tagIds !== undefined && Array.isArray(tagIds) && tagIds.length > 0) {
		const tags = await em.findBy(Tag, { id: In(tagIds) })
		if (tags.length !== tagIds.length) {
			const foundTagIds = tags.map(tag => tag.id)
			const missingTagIds = tagIds.filter(id => !foundTagIds.includes(id))
			throw new Error(`Tags not found: ${missingTagIds.join(', ')}`)
		}
		product.tags = tags
	}
	if (productFields.name && productFields.name !== productFields.name) {
		const existingProduct = await em.findOne(Product, { where: { name: productFields.name } })
		if (existingProduct) {
			throw new Error(`Product with name '${productFields.name}' already exists`)
		}
	}
	em.merge(Product, product, productFields)
	await em.save(product)
	return await em.findOne(Product, {
		where: { id: product.id },
		relations: ['category', 'tags'],
	})
}

//! TypeORM: delete directo por ID
async function deleteProduct(id: number) {
	await getProductById(id)
	await em.delete(Product, { id })
	return true
}

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct }
