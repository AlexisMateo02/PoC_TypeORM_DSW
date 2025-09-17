import { BaseEntity as TypeORMBaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity extends TypeORMBaseEntity {
	@PrimaryGeneratedColumn('increment')
	id!: number

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date
}
