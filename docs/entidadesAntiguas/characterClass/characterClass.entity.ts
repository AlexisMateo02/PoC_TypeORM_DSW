import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.js'
import { Character } from '../character/character.entity.js'

@Entity()
export class CharacterClass extends BaseEntity {
	@Column({ nullable: false, unique: true })
	name!: string

	@Column()
	description!: string

	@OneToMany(() => Character, character => character.characterClass, { cascade: true })
	characters!: Character[]
}
