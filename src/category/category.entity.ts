import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.js'
import { Product } from '../product/product.entity.js'

@Entity()
export class Category extends BaseEntity {
	@Column({ unique: true, nullable: false })
	name!: string

	@Column({ nullable: true })
	description?: string

	@OneToMany(() => Product, product => product.category, { cascade: true })
	products!: Product[]
}
