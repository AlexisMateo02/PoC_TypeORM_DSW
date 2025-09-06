import { Entity, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.js'
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

	@ManyToOne(() => Category, { nullable: false, eager: false })
	@JoinColumn({ name: 'categoryId' })
	category!: Category

	@ManyToMany(() => Tag, tag => tag.products)
	@JoinTable({
		name: 'product_tags',
		joinColumn: { name: 'productId', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
	})
	tags!: Tag[]
}
