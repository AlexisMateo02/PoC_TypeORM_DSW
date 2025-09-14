import { Request, Response } from 'express'
import { error, success } from '../shared/errors/httpResponses.js'
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from './category.service.js'

async function findAll(req: Request, res: Response) {
	try {
		const categories = await getAllCategories()
		return success.Ok(res, 'All categories found successfully', categories)
	} catch (err: any) {
		console.error('Error fetching categories:', err)
		return error.InternalServerError(res, 'Failed to find categories')
	}
}

async function findOne(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const category = await getCategoryById(id)
		return success.Ok(res, 'Category found successfully', category)
	} catch (err: any) {
		if (err.message === 'Invalid category ID') {
			return error.BadRequest(res, err.message)
		}
		if (err.message.includes('not found')) {
			return error.NotFound(res, err.message)
		}
		console.error('Error fetching category:', err)
		return error.InternalServerError(res, 'Failed to find category')
	}
}

async function add(req: Request, res: Response) {
	try {
		const categoryData = req.body.sanitizedInput
		const category = await createCategory(categoryData)
		return success.Created(res, 'Category created successfully', category)
	} catch (err: any) {
		if (err.message.includes('already exists')) {
			return error.DuplicateEntry(res, err.message)
		}
		console.error('Error creating category:', err)
		return error.InternalServerError(res, 'Failed to create category')
	}
}

async function update(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		const category = await updateCategory(id, req.body.sanitizedInput)
		return success.Ok(res, 'Category updated successfully', category)
	} catch (err: any) {
		if (err.message.includes('already exists')) {
			return error.DuplicateEntry(res, err.message)
		}
		if (err.message === 'Invalid category ID') {
			return error.BadRequest(res, err.message)
		}
		if (err.message.includes('not found')) {
			return error.NotFound(res, err.message)
		}
		console.error('Error updating category:', err)
		return error.InternalServerError(res, 'Failed to update category')
	}
}

async function remove(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		await deleteCategory(id)
		return success.NoContent(res, 'Category deleted successfully')
	} catch (err: any) {
		if (err.message === 'Invalid category ID') {
			return error.BadRequest(res, err.message)
		}
		if (err.message.includes('not found')) {
			return error.NotFound(res, err.message)
		}
		if (err.message.includes('categorizes')) {
			return error.DuplicateEntry(res, err.message)
		}
		console.error('Error deleting category:', err)
		return error.InternalServerError(res, 'Failed to delete category')
	}
}

export const controllerCategory = {
	findAll,
	findOne,
	add,
	update,
	remove,
}
