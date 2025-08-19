import { Entity, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.js'
import { CharacterClass } from '../characterClass/characterClass.entity.js'
import { Item } from '../item/item.entity.js'

@Entity()
export class Character extends BaseEntity {
	@Column({ nullable: false })
	name!: string

	@ManyToOne(() => CharacterClass, { nullable: false, eager: false })
	@JoinColumn({ name: 'character_class_id' })
	characterClass!: CharacterClass

	@Column({ nullable: false })
	level!: number

	@Column({ nullable: false })
	hp!: number

	@Column({ nullable: false })
	mana!: number

	@Column({ nullable: false })
	attack!: number

	@ManyToMany(() => Item, item => item.characters, { cascade: true })
	//! Evitamos crearla como 'character_items_item'
	@JoinTable({
		name: 'character_items',
		joinColumn: { name: 'character_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'item_id', referencedColumnName: 'id' }
	})
	items!: Item[]
}
