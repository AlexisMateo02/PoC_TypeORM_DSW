import { Request, Response } from 'express'
import { AppDataSource } from '../shared/db/orm.js'
import { error, success } from '../shared/errors/httpResponses.js'
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from './product.service.js'

const em = AppDataSource.manager

async function findAll(req: Request, res: Response) {
  try {
    const products = await getAllProducts()
    return success.Ok(res, 'All products found successfully', products)
  } catch (err: any) {
    console.error('Error fetching products:', err)
    return error.InternalServerError(res, 'Failed to find products')
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const product = await getProductById(id)
    return success.Ok(res, 'Product found successfully', product)
  } catch (err: any) {
    if (err.message === 'Invalid product ID') {
      return error.BadRequest(res, err.message)
    }
    if (err.message.includes('not found')) {
      return error.NotFound(res, err.message)
    }
    console.error('Error fetching product:', err)
    return error.InternalServerError(res, 'Failed to find product')
  }
}

async function add(req: Request, res: Response) {
  try {
    const productData = req.body.sanitizedInput
    const product = await createProduct(productData)
    return success.Created(res, 'Product created successfully', product)
  } catch (err: any) {
    if (err.message.includes('already exists')){
      return error.DuplicateEntry(res, err.message)
    }
    if (err.message.includes('not found')) {
      return error.NotFound(res, err.message)
    }
    console.error('Error creating product:', err)
    return error.InternalServerError(res, 'Failed to create product')
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const product = await updateProduct(id, req.body.sanitizedInput)
    return success.Ok(res, 'Product updated successfully', product)
  } catch (err: any) {
    if (err.message.includes('already exists')){
      return error.DuplicateEntry(res, err.message)
    }
    if (err.message === 'Invalid product ID') {
      return error.BadRequest(res, err.message)
    }
    if (err.message.includes('not found')) {
      return error.NotFound(res, err.message)
    }
    console.error('Error updating product:', err)
    return error.InternalServerError(res, 'Failed to update product')
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    await deleteProduct(id)
    return success.NoContent(res, 'Product deleted successfully')
  } catch (err: any) {
    if (err.message === 'Invalid product ID') {
      return error.BadRequest(res, err.message)
    }
    if (err.message.includes('not found')) {
      return error.NotFound(res, err.message)
    }
    console.error('Error deleting product:', err)
    return error.InternalServerError(res, 'Failed to delete product')
  }
}

export const controllerProduct = {
	findAll,
	findOne,
	add,
	update,
	remove,
}
