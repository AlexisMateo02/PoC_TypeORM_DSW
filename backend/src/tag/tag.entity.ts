import { Entity, Column, ManyToMany } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Product } from '../product/product.entity.js'

@Entity()
export class Tag extends BaseEntity {
	@Column({ unique: true, nullable: false })
	name!: string

	@Column({ nullable: false })
	color!: string // Hexadecimal color code: #FF5733

	//@Column({ nullable: false }) //! Propiedad agregada para migración
	//esObligatorio!: boolean

	@Column({ nullable: true })
	description?: string

	@ManyToMany(() => Product, product => product.tags)
	products!: Product[]
}
