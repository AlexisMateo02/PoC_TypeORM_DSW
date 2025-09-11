import { AppDataSource } from '../shared/db/orm.js'
import { Product } from './product.entity.js'
import { Category } from '../category/category.entity.js'
import { Tag } from '../tag/tag.entity.js'
import { In } from 'typeorm'

const em = AppDataSource.manager

interface ProductData {
  name: string
  description?: string
  price: number
  stock: number
  category: number
  tags?: number[]
}

async function getAllProducts() {
  return await em.find(Product, { relations: ['category', 'tags'] })
}

async function getProductById(id: number) {
  if (!id || isNaN(id) || id <= 0) {
    throw new Error('Invalid product ID')
  }

  const product = await em.findOne(Product, { 
    where: { id }, 
    relations: ['category', 'tags'] 
  })

  if (!product) {
    throw new Error(`Product with ID ${id} not found`)
  }

  return product
}

async function createProduct(productData: ProductData) {
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
  
  await em.save(product)
  
  return await em.findOne(Product, { 
    where: { id: product.id }, 
    relations: ['category', 'tags'] 
  })
}

async function updateProduct(id: number, productData: ProductData) {
  const { category: categoryId, tags: tagIds, ...productFields } = productData
  const product = await getProductById(id)
  
  em.merge(Product, product, productFields)

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

  await em.save(product)

  return await em.findOne(Product, { 
    where: { id: product.id }, 
    relations: ['category', 'tags'] 
  })
}

async function deleteProduct(id: number) {
  if (!id || isNaN(id) || id <= 0) {
    throw new Error('Invalid product ID')
  }

  await getProductById(id)

  const result = await em.delete(Product, { id })
  
  if (result.affected === 0) {
    throw new Error(`Product with ID ${id} not found`)
  }

  return true
}

export { createProduct, getProductById, updateProduct, getAllProducts, deleteProduct }