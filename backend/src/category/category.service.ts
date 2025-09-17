import { Category } from './category.entity.js'
import { Product } from '../product/product.entity.js'

interface CategoryCreateData {
	name: string
	description?: string
}

interface CategoryUpdateData {
	name?: string
	description?: string | null
}

function validateId(id: number): void {
	if (!id || isNaN(id) || id <= 0) {
		throw new Error('Invalid category ID')
	}
}

//! TypeORM: find
async function getAllCategories() {
	return await Category.find({ relations: ['products'] })
}

//! TypeORM: findOne
async function getCategoryById(id: number) {
	validateId(id)
	const category = await Category.findOne({ where: { id }, relations: ['products'] })
	if (!category) {
		throw new Error(`Category with ID ${id} not found`)
	}
	return category
}

//! TypeORM: assign + save
async function createCategory(categoryData: CategoryCreateData) {
	const existingCategory = await Category.findOne({
		where: { name: categoryData.name },
	})
	if (existingCategory) {
		throw new Error(`Category with name '${categoryData.name}' already exists`)
	}
	const category = new Category()
	Object.assign(category, categoryData)
	await category.save()
	return await Category.findOne({ where: { id: category.id } })
}

//! TypeORM: findOne + assign + save
async function updateCategory(id: number, categoryData: CategoryUpdateData) {
	const category = await getCategoryById(id)
	if (categoryData.name && categoryData.name !== category.name) {
		const existingCategory = await Category.findOne({ where: { name: categoryData.name } })
		if (existingCategory) {
			throw new Error(`Category with name '${categoryData.name}' already exists`)
		}
	}
	Object.assign(category, categoryData)
	await category.save()
	return await Category.findOne({ where: { id: category.id } })
}

//! TypeORM: remove + queryBuilder
async function deleteCategory(id: number) {
	const category = await getCategoryById(id)
	const productCount = await Product.createQueryBuilder('product')
		.leftJoin('product.category', 'category')
		.where('category.id = :categoryId', { categoryId: id })
		.getCount()
	if (productCount > 0) {
		throw new Error(`Category ${category.name} categorizes ${productCount} product${productCount > 1 ? 's' : ''}`)
	}
	await category.remove()
	return true
}

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory }
