import { Request, Response } from 'express'
import { error, success } from '../shared/errors/httpResponses.js'
import { getAllTags, getTagById, createTag, updateTag, deleteTag } from './tag.service.js'
import { AppDataSource } from '../shared/db/orm.js'
import { Tag } from './tag.entity.js'

const em = AppDataSource.manager

async function findAll(req: Request, res: Response) {
	try {
		const tags = await getAllTags()
		return success.Ok(res, 'All tags found successfully', tags)
	} catch (err: any) {
		console.error('Error fetching tags:', err)
		return error.InternalServerError(res, 'Failed to find tags')
	}
}

async function findOne(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
    const tag = await getTagById(id)
    return success.Ok(res, 'Tag found successfully', tag)
	} catch (err: any) {
		if (err.message === 'Invalid tag ID') {
      return error.BadRequest(res, err.message)
    }
    if (err.message.includes('not found')) {
      return error.NotFound(res, err.message)
    }
		console.error('Error fetching tag:', err)
		return error.InternalServerError(res, 'Failed to find tag')
	}
}

async function add(req: Request, res: Response) {
  try {
    const tagData = req.body.sanitizedInput
    const tag = await createTag(tagData)
    return success.Created(res, 'Tag created successfully', tag)
  } catch (err: any) {
    if (err.message.includes('already exists')){
      return error.DuplicateEntry(res, err.message)
    }
		console.error('Error creating tag:', err)
		return error.InternalServerError(res, 'Failed to create tag')
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tag = await updateTag(id, req.body.sanitizedInput)
    return success.Ok(res, 'Tag updated successfully', tag)
  } catch (err: any) {
    if (err.message.includes('already exists')){
      return error.DuplicateEntry(res, err.message)
    }
		if (err.message === 'Invalid tag ID') {
      return error.BadRequest(res, err.message)
    }
		if (err.message.includes('not found')) {
      return error.NotFound(res, err.message)
    }
    console.error('Error updating tag:', err)
    return error.InternalServerError(res, 'Failed to update tag')
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    await deleteTag(id)
    return success.NoContent(res, 'Tag deleted successfully')
  } catch (err: any) {
    if (err.message === 'Invalid tag ID') {
      return error.BadRequest(res, err.message)
    }
    if (err.message.includes('not found')) {
      return error.NotFound(res, err.message)
    }
    console.error('Error deleting tag:', err)
    return error.InternalServerError(res, 'Failed to delete tag')
  }
}

export const controllerTag = {
	findAll,
	findOne,
	add,
	update,
	remove,
}

