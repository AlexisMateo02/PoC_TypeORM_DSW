import { Tag } from './tag.entity.js'
import { Product } from '../product/product.entity.js'

interface TagCreateData {
	name: string
	description?: string
	color?: string // Hexadecimal color code: #FF5733
}

interface TagUpdateData {
	name?: string
	description?: string | null
	color?: string | null
}

function validateId(id: number): void {
	if (!id || isNaN(id) || id <= 0) {
		throw new Error('Invalid tag ID')
	}
}

//! TypeORM: find
async function getAllTags() {
	return await Tag.find({ relations: ['products'] })
}

//! TypeORM: findOne
async function getTagById(id: number) {
	validateId(id)
	const tag = await Tag.findOne({ where: { id }, relations: ['products'] })
	if (!tag) {
		throw new Error(`Tag with ID ${id} not found`)
	}
	return tag
}

//! TypeORM: assign + save
async function createTag(tagData: TagCreateData) {
	const existingTag = await Tag.findOne({
		where: { name: tagData.name },
	})
	if (existingTag) {
		throw new Error(`Tag with name '${tagData.name}' already exists`)
	}
	const tag = new Tag()
	Object.assign(tag, tagData)
	await tag.save()
	return await Tag.findOne({ where: { id: tag.id } })
}

//! TypeORM: findOne + assign + save
async function updateTag(id: number, tagData: TagUpdateData) {
	const tag = await getTagById(id)
	if (tagData.name && tagData.name !== tag.name) {
		const existingTag = await Tag.findOne({ where: { name: tagData.name } })
		if (existingTag) {
			throw new Error(`Tag with name '${tagData.name}' already exists`)
		}
	}
	Object.assign(tag, tagData)
	await tag.save()
	return await Tag.findOne({ where: { id: tag.id } })
}

//! TypeORM: remove + queryBuilder
async function deleteTag(id: number) {
	const tag = await getTagById(id)
	const productCount = await Product.createQueryBuilder('product')
		.leftJoin('product.tags', 'tag')
		.where('tag.id = :tagId', { tagId: id })
		.getCount()
	if (productCount > 0) {
		throw new Error(`Tag ${tag.name} is used by ${productCount} product${productCount > 1 ? 's' : ''}`)
	}
	await tag.remove()
	return true
}

export { getAllTags, getTagById, createTag, updateTag, deleteTag }
