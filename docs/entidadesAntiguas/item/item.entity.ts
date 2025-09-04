import { Entity, Column, ManyToMany } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.js'
import { Character } from '../character/character.entity.js'

@Entity()
export class Item extends BaseEntity {
	@Column({ nullable: false, unique: true })
	name!: string

	@Column()
	description!: string

	@ManyToMany(() => Character, character => character.items)
	characters!: Character[]
}
