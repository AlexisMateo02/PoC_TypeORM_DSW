import { AppDataSource } from '../shared/db/orm.js'
import { Tag } from '../tag/tag.entity.js'

const em = AppDataSource.manager

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
  return await em.find(Tag)
}

//! TypeORM: findOne
async function getTagById(id: number) {
  validateId(id)
  const tag = await em.findOne(Tag, { where: { id } })
  if (!tag) {
    throw new Error(`Tag with ID ${id} not found`)
  }
  return tag
}

//! TypeORM: create + save
async function createTag(tagData: TagCreateData) {
  const tag = em.create(Tag, tagData)
  const existingTag = await em.findOne(Tag, {
    where: { name: tagData.name }
  })
  if (existingTag) {
    throw new Error(`Tag with name '${tagData.name}' already exists`)
  }
  await em.save(tag)
  return await em.findOne(Tag, { where: { id: tag.id } })
}

//! TypeORM: findOne + merge + save
async function updateTag(id: number, tagData: TagUpdateData) {
  const tag = await getTagById(id)
  if (tagData.name && tagData.name !== tag.name) {
    const existingTag = await em.findOne(Tag, { where: { name: tagData.name } })
    if (existingTag) {
      throw new Error(`Tag with name '${tagData.name}' already exists`)
    }
  }
  em.merge(Tag, tag, tagData)
  await em.save(tag)
  return await em.findOne(Tag, { where: { id: tag.id } })
}

//! TypeORM: delete directo por ID
async function deleteTag(id: number) {
  await getTagById(id)
  await em.delete(Tag, { id })
  return true
}

export { getAllTags, getTagById, createTag, updateTag, deleteTag }