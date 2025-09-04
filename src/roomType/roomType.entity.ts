import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.js'
import { Room } from '../room/room.entity.js'

@Entity()
export class RoomType extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string

  @OneToMany(() => Room, room => room.roomType)
  rooms!: Room[]
}