import { AppDataSource } from '../shared/db/orm.js'
import { Category } from '../category/category.entity.js'

const em = AppDataSource.manager

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

async function getAllCategories() {
  return await em.find(Category)
}

async function getCategoryById(id: number) {
  validateId(id)
  const category = await em.findOne(Category, { where: { id } })
  if (!category) {
    throw new Error(`Category with ID ${id} not found`)
  }
  return category
}

async function createCategory(categoryData: CategoryCreateData) {
  const category = em.create(Category, categoryData)
  const existingCategory = await em.findOne(Category, {
    where: { name: categoryData.name }
  })
  if (existingCategory) {
    throw new Error(`Category with name '${categoryData.name}' already exists`)
  }
  await em.save(category)
  return await em.findOne(Category, { where: { id: category.id } })
}

async function updateCategory(id: number, categoryData: CategoryUpdateData) {
  const category = await getCategoryById(id)
  if (categoryData.name && categoryData.name !== category.name) {
    const existingCategory = await em.findOne(Category, { where: { name: categoryData.name } })
    if (existingCategory) {
      throw new Error(`Category with name '${categoryData.name}' already exists`)
    }
  }
  em.merge(Category, category, categoryData)
  await em.save(category)
  return await em.findOne(Category, { where: { id: category.id } })
}

async function deleteCategory(id: number) {
  await getCategoryById(id)
  await em.delete(Category, { id })
  return true
}

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory }