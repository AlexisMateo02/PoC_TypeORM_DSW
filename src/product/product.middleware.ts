import { Request, Response, NextFunction } from 'express'
import { error } from '../shared/errors/httpResponses.js'

function sanitizeProductInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: typeof req.body.name === 'string' ? req.body.name.trim() : undefined,
    description: typeof req.body.description === 'string' 
      ? req.body.description.trim() 
      : req.body.description === null ? null : undefined,
    price: typeof req.body.price === 'string' ? parseFloat(req.body.price) : req.body.price,
    stock: typeof req.body.stock === 'string' ? parseInt(req.body.stock, 10) : req.body.stock,
    category: typeof req.body.category === 'string' ? parseInt(req.body.category, 10) : req.body.category,
    tags: Array.isArray(req.body.tags)
      ? req.body.tags
          .map((tag: any) => {
            const parsedTag = Number(tag);
            return !isNaN(parsedTag) && Number.isInteger(parsedTag) ? parsedTag : null;
          })
          .filter((tag: number | null): tag is number => tag !== null)
      : [],
  }
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function validateCreateInput(req: Request, res: Response, next: NextFunction) {
  const input = req.body.sanitizedInput
  if (!input.name) return error.BadRequest(res, 'Product name is required')
  if (isNaN(input.price)) return error.BadRequest(res, 'Product price is required')
  if (isNaN(input.stock)) return error.BadRequest(res, 'Product stock is required')
  if (isNaN(input.category)) return error.BadRequest(res, 'Product category is required')
  if (input.name.length < 2) return error.BadRequest(res, 'Name must be at least 2 characters')
  if (input.name.length > 255) return error.BadRequest(res, 'Name cannot exceed 255 characters')
  if (input.description && input.description.length > 255) return error.BadRequest(res, 'Description cannot exceed 255 characters')
  if (input.price <= 0) return error.BadRequest(res, 'Price must be greater than 0')
  if (input.stock < 0) return error.BadRequest(res, 'Stock cannot be negative')
  if (input.tags.length > 50) return error.BadRequest(res, 'Cannot assign more than 50 tags to a product')
  next()
}

function validateUpdateInput(req: Request, res: Response, next: NextFunction) {
  const input = req.body.sanitizedInput
  const hasFields = Object.keys(input).some(key => input[key] !== undefined)
  if (!hasFields) {
    return error.BadRequest(res, 'At least one field must be provided for update')
  }
  if (input.name !== undefined) {
    if (!input.name || input.name.trim() === '') {
      return error.BadRequest(res, 'Product name cannot be empty')
    }
    if (input.name.length < 2) {
      return error.BadRequest(res, 'Name must be at least 2 characters')
    }
    if (input.name.length > 255) {
      return error.BadRequest(res, 'Name cannot exceed 255 characters')
    }
  }
  if (input.description !== undefined) {
    if (input.description !== null && input.description.length > 500) {
      return error.BadRequest(res, 'Description cannot exceed 500 characters')
    }
  }
  if (input.price !== undefined) {
    if (isNaN(input.price) || !Number.isFinite(input.price)) {
      return error.BadRequest(res, 'Price must be a valid number')
    }
    if (input.price <= 0) {
      return error.BadRequest(res, 'Price must be greater than 0')
    }
  }
  if (input.stock !== undefined) {
    if (isNaN(input.stock) || !Number.isInteger(input.stock)) {
      return error.BadRequest(res, 'Stock must be a valid integer')
    }
    if (input.stock < 0) {
      return error.BadRequest(res, 'Stock cannot be negative')
    }
  }
  if (input.category !== undefined) {
    if (isNaN(input.category) || !Number.isInteger(input.category) || input.category <= 0) {
      return error.BadRequest(res, 'Category ID must be a positive integer')
    }
  }
  if (input.tags !== undefined && !Array.isArray(input.tags)) {
    return error.BadRequest(res, 'Tags must be an array')
  }
  next()
}

export { sanitizeProductInput, validateCreateInput, validateUpdateInput }