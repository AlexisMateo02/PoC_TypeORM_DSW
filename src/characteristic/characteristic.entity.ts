import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.js'
import { PropertyCharacteristic } from '../propertyCharacteristic/propertyCharacteristic.entity.js'

@Entity()
export class Characteristic extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  type!: string

  @OneToMany(() => PropertyCharacteristic, propertyCharacteristic => propertyCharacteristic.characteristic)
  propertyCharacteristics!: PropertyCharacteristic[]
}