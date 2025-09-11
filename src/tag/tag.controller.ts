import { Request, Response, NextFunction} from 'express'
import { error, success } from '../shared/errors/httpResponses.js'
import { AppDataSource } from '../shared/db/orm.js'
import { Tag } from './tag.entity.js'

const em = AppDataSource.manager

async function findAll(req: Request, res: Response) {
	try {
		const tags = await em.find(Tag)
		return success.Ok(res, 'All tags found successfully', tags)
	} catch (err: any) {
		console.error('Error fetching tags:', err)
		return error.InternalServerError(res, 'Failed to find tags')
	}
}

async function findOne(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		if (!req.params.id || isNaN(id) || id <= 0) {
			return error.BadRequest(res, 'Invalid tag ID')
		}
		const tag = await em.findOne(Tag, { where: { id } })
		if (!tag) {
      return error.NotFound(res, `Tag with ID ${id} not found`)
    }
		return success.Ok(res, 'Tag found successfully', tag)
	} catch (err: any) {
		console.error('Error fetching tag:', err)
		return error.InternalServerError(res, 'Failed to find tag')
	}
}

//! TypeORM: create + save (MikroORM: create + flush)
async function add(req: Request, res: Response) {
	try {
		const tag = em.create(Tag, req.body)
		await em.save(tag)
		return success.Created(res, 'Tag created successfully', tag)
	} catch (err: any) {
		console.error('Error creating tag:', err)
		return error.InternalServerError(res, 'Failed to create tag')
	}
}

//! TypeORM: findOneOrFail + merge + save (MikroORM: getReference + assign + flush)
async function update(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		if (isNaN(id) || id <= 0) {
			return error.BadRequest(res, 'Invalid ID')
		}
		const tag = await em.findOneOrFail(Tag, { where: { id } })
		em.merge(Tag, tag, req.body)
		await em.save(tag)
		return success.Ok(res, 'Tag found', tag)
	} catch (err: any) {
		return error.InternalServerError(res, err.message)
	}
}

//! TypeORM: delete directo por ID (MikroORM: getReference + removeAndFlush (remove + flush))
async function remove(req: Request, res: Response) {
	try {
		const id = Number.parseInt(req.params.id)
		if (isNaN(id) || id <= 0) {
			return error.BadRequest(res, 'Invalid ID')
		}
		await em.delete(Tag, { id })
		return success.Ok(res, 'Tag deleted')
	} catch (err: any) {
		return error.InternalServerError(res, err.message)
	}
}

export const controllerTag = {
	findAll,
	findOne,
	add,
	update,
	remove,
}

