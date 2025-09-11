import { AppDataSource } from '../shared/db/orm.js'
import { Product } from './product.entity.js'
import { Category } from '../category/category.entity.js'
import { Tag } from '../tag/tag.entity.js'
import { In } from 'typeorm'

const em = AppDataSource.manager

interface CreateProductData {
  name: string
  description?: string
  price: number
  stock: number
  category: number
  tags?: number[]
}

async function createProduct(productData: CreateProductData) {
  const { category: categoryId, tags: tagIds, ...productFields } = productData
  
  const product = em.create(Product, productFields)
  
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
      throw new Error('Some tags not found')
    }
    product.tags = tags
  }
  
  await em.save(product)
  
  return await em.findOne(Product, { 
    where: { id: product.id }, 
    relations: ['category', 'tags'] 
  })
}

export { createProduct }