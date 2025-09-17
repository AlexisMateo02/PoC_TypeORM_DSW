import { Product } from './product.entity.js'
import { Category } from '../category/category.entity.js'
import { Tag } from '../tag/tag.entity.js'
import { In } from 'typeorm'

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
	return await await Product.find({ relations: ['category', 'tags'] })
}

//! TypeORM: findOne
async function getProductById(id: number) {
	validateId(id)
	const product = await Product.findOne({
		where: { id },
		relations: ['category', 'tags'],
	})
	if (!product) {
		throw new Error(`Product with ID ${id} not found`)
	}
	return product
}

//! TypeORM: assign + save
async function createProduct(productData: ProductCreateData) {
	const existingProduct = await Product.findOne({
		where: { name: productData.name },
	})
	if (existingProduct) {
		throw new Error(`Product with name '${productData.name}' already exists`)
	}
	const { category: categoryId, tags: tagIds, ...productFields } = productData
	const product = new Product()
	Object.assign(product, productFields)
	const category = await Category.findOne({ where: { id: categoryId } })
	if (!category) {
		throw new Error('Category not found')
	}
	product.category = category
	if (Array.isArray(tagIds)) {
		if (tagIds.length > 0) {
			const tags = await Tag.findBy({ id: In(tagIds) })
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
	await product.save()
	return await Product.findOne({
		where: { id: product.id },
		relations: ['category', 'tags'],
	})
}

//! TypeORM: findOne + assign + save
async function updateProduct(id: number, productData: ProductUpdateData) {
	const { category: categoryId, tags: tagIds, ...productFields } = productData
	const product = await getProductById(id)
	if (categoryId !== undefined) {
		const category = await Category.findOne({ where: { id: categoryId } })
		if (!category) {
			throw new Error('Category not found')
		}
		product.category = category
	}
	if (tagIds !== undefined && Array.isArray(tagIds)) {
		if (tagIds.length > 0) {
			const tags = await Tag.findBy({ id: In(tagIds) })
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
	Object.assign(product, productFields)
	await product.save()
	return await Product.findOne({
		where: { id: product.id },
		relations: ['category', 'tags'],
	})
}

//! TypeORM: remove
async function deleteProduct(id: number) {
	const product = await getProductById(id)
	await product.remove()
	return true
}

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct }
