import { Entity, Column, ManyToOne, OneToMany, JoinColumn, PrimaryColumn } from 'typeorm'
import { Person } from '../person/person.entity.js'
import { Property } from '../property/property.entity.js'
import { ContractRequest } from '../contractRequest/contractRequest.entity.js'
import { Visit } from '../visit/visit.entity.js'

@Entity('agente_asignado')
export class AssignedAgent {
    @PrimaryColumn({ type: 'int', unsigned: true })
    agentId!: number

    @PrimaryColumn({ type: 'int', unsigned: true })
    propertyId!: number

    @PrimaryColumn({ type: 'datetime' })
    dateTimeFrom!: Date

    @Column({ type: 'datetime', nullable: true })
    dateTimeTo?: Date

    @ManyToOne(() => Person, { nullable: false })
    @JoinColumn({ name: 'agentId' })
    agent!: Person

    @ManyToOne(() => Property, { nullable: false })
    @JoinColumn({ name: 'propertyId' })
    property!: Property

    @OneToMany(() => ContractRequest, contractRequest => contractRequest.assignedAgent)
    contractRequests!: ContractRequest[]

    @OneToMany(() => Visit, visit => visit.assignedAgent)
    visits!: Visit[]
}