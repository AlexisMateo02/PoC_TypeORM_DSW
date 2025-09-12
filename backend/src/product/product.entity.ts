import { Entity, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Category } from '../category/category.entity.js'
import { Tag } from '../tag/tag.entity.js'

@Entity()
export class Product extends BaseEntity {
	@Column({ unique: true, nullable: false })
	name!: string

	@Column({ nullable: true })
	description?: string

	@Column('decimal', { precision: 10, scale: 2, nullable: false })
	price!: number

	@Column('int', { nullable: false })
	stock!: number

	@ManyToOne(() => Category, category => category.products, { nullable: false })
	@JoinColumn({ name: 'category_id' })
	category!: Category

	@ManyToMany(() => Tag, tag => tag.products)
	@JoinTable({
		name: 'product_tags',
		joinColumn: { name: 'product_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
	})
	tags!: Tag[]
}
