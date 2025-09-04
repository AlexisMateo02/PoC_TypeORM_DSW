import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.js'
import { Warranty } from '../warranty/warranty.entity.js'

@Entity()
export class WarrantyType extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string

  @OneToMany(() => Warranty, warranty => warranty.warrantyType)
  warranties!: Warranty[]
}