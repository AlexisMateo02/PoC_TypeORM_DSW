import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm'
import { Characteristic } from '../characteristic/characteristic.entity.js'
import { Property } from '../property/property.entity.js'

@Entity('property_characteristic')
export class PropertyCharacteristic {
  @PrimaryColumn({ type: 'int', unsigned: true })
  characteristicId!: number

  @PrimaryColumn({ type: 'int', unsigned: true })
  propertyId!: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  content!: string

  @ManyToOne(() => Characteristic, { nullable: false })
  @JoinColumn({ name: 'characteristicId' })
  characteristic!: Characteristic

  @ManyToOne(() => Property, { nullable: false })
  @JoinColumn({ name: 'propertyId' })
  property!: Property
}