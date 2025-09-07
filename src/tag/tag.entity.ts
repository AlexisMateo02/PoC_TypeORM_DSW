import { Entity, Column, ManyToMany } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Product } from '../product/product.entity.js'

@Entity()
export class Tag extends BaseEntity {
	@Column({ unique: true, nullable: false })
	name!: string

	@Column({ nullable: true })
	color?: string // Hexadecimal color code: #FF5733

	@Column({ nullable: true })
	description?: string

	@ManyToMany(() => Product, product => product.tags)
	products!: Product[]
}
