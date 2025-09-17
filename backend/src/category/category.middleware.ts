import { Request, Response, NextFunction } from 'express'
import { error } from '../shared/errors/httpResponses.js'

function sanitizeCategoryInput(req: Request, res: Response, next: NextFunction) {
	req.body.sanitizedInput = {
		name: typeof req.body.name === 'string' ? req.body.name.trim() : undefined,
		description:
			typeof req.body.description === 'string'
				? req.body.description.trim()
				: req.body.description === null
				? null
				: undefined,
	}
	Object.keys(req.body.sanitizedInput).forEach(key => {
		if (req.body.sanitizedInput[key] === undefined) {
			delete req.body.sanitizedInput[key]
		}
	})
	next()
}

function validateCreateInput(req: Request, res: Response, next: NextFunction) {
	const input = req.body.sanitizedInput
	if (!input.name) return error.BadRequest(res, 'Category name is required')
	if (input.name.length < 2) return error.BadRequest(res, 'Name must be at least 2 characters')
	if (input.name.length > 255) return error.BadRequest(res, 'Name cannot exceed 255 characters')
	if (input.description && input.description.length > 255)
		return error.BadRequest(res, 'Description cannot exceed 255 characters')
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
			return error.BadRequest(res, 'Category name cannot be empty')
		}
		if (input.name.length < 2) {
			return error.BadRequest(res, 'Name must be at least 2 characters')
		}
		if (input.name.length > 255) {
			return error.BadRequest(res, 'Name cannot exceed 255 characters')
		}
	}
	if (input.description !== undefined) {
		if (input.description !== null && input.description.length > 255) {
			return error.BadRequest(res, 'Description cannot exceed 255 characters')
		}
	}
	next()
}

export { sanitizeCategoryInput, validateCreateInput, validateUpdateInput }
