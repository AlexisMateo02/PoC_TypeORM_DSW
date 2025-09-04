import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm'
import { Property } from '../property/property.entity.js'

@Entity()
export class PropertyValue {
  @PrimaryColumn({ type: 'int', unsigned: true })
  propertyId!: number

  @PrimaryColumn({ type: 'datetime' })
  dateTimeFrom!: Date

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  value!: number

  @ManyToOne(() => Property, { nullable: false })
  @JoinColumn({ name: 'propertyId' })
  property!: Property
}