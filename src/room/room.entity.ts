import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm'
import { Property } from '../property/property.entity.js'
import { RoomType } from '../roomType/roomType.entity.js'

@Entity()
export class Room {
  @PrimaryColumn({ type: 'int', unsigned: true })
  propertyId!: number

  @PrimaryColumn({ type: 'int', unsigned: true })
  roomTypeId!: number

  @Column({ type: 'int', nullable: false })
  quantity!: number

  @Column({ type: 'int', nullable: true })
  size?: number

  @ManyToOne(() => Property, { nullable: false })
  @JoinColumn({ name: 'propertyId' })
  property!: Property

  @ManyToOne(() => RoomType, { nullable: false })
  @JoinColumn({ name: 'roomTypeId' })
  roomType!: RoomType
}