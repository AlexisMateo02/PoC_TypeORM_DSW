import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm'
import { AssignedAgent } from '../assignedAgent/assignedAgent.entity.js'
import { Person } from '../person/person.entity.js'

@Entity()
export class Visit {
  @PrimaryColumn({ type: 'int', unsigned: true })
  clientId!: number

  @PrimaryColumn({ type: 'datetime' })
  visitDateTime!: Date

  @Column({ type: 'int', unsigned: true, nullable: false })
  agentId!: number

  @Column({ type: 'int', unsigned: true, nullable: false })
  propertyId!: number

  @Column({ type: 'datetime', nullable: false })
  dateTimeFrom!: Date

  @ManyToOne(() => AssignedAgent, { nullable: false })
  @JoinColumn([
    { name: 'agentId', referencedColumnName: 'agentId' },
    { name: 'propertyId', referencedColumnName: 'propertyId' },
    { name: 'dateTimeFrom', referencedColumnName: 'dateTimeFrom' }
  ])
  assignedAgent!: AssignedAgent

  @ManyToOne(() => Person, { nullable: false })
  @JoinColumn({ name: 'clientId' })
  client!: Person
}