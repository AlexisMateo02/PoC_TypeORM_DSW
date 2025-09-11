import { Request, Response, NextFunction } from 'express'
import { error } from '../shared/errors/httpResponses.js'

function sanitizeProductInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: typeof req.body.name === 'string' ? req.body.name.trim() : undefined,
    description: typeof req.body.description === 'string' ? req.body.description.trim() : null,
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
  next()
}

function validateProductInput(req: Request, res: Response, next: NextFunction) {
  const input = req.body.sanitizedInput
  
  // Validar campos requeridos
  if (!input.name) return error.BadRequest(res, 'Product name is required')
  if (isNaN(input.price)) return error.BadRequest(res, 'Product price is required')
  if (isNaN(input.stock)) return error.BadRequest(res, 'Product stock is required')
  if (isNaN(input.category)) return error.BadRequest(res, 'Product category is required')
  
  // Validar tipos y rangos
  if (input.name.length < 2) return error.BadRequest(res, 'Name must be at least 2 characters')
  if (input.name.length > 255) return error.BadRequest(res, 'Name cannot exceed 255 characters')
  if (input.description && input.description.length > 255) return error.BadRequest(res, 'Description cannot exceed 255 characters')
  if (input.price <= 0) return error.BadRequest(res, 'Price must be greater than 0')
  if (input.stock < 0) return error.BadRequest(res, 'Stock cannot be negative')
  
  next()
}

export { sanitizeProductInput, validateProductInput }