import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id!: number

	@CreateDateColumn()
	created_at!: Date

	@UpdateDateColumn()
	updated_at!: Date
}
