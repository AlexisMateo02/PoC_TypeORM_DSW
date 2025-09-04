import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Person } from "../person/person.entity.js";
import { AssignedAgent } from "../assignedAgent/assignedAgent.entity.js";
import { Warranty } from '../warranty/warranty.entity.js'
import { Payment } from "../payment/payment.entity.js";

@Entity()
export class ContractRequest extends BaseEntity {
    @Column({ type: 'date', nullable: false })
    requestDate!: Date;

    @Column({ type: 'decimal', precision: 12, scale: 3, nullable: false })
    monthlyAmount!: number

    @Column({ type: 'varchar', length: 255, nullable: true })
    contractFilePath?: string

    @Column({ type: 'varchar', length: 20, nullable: false })
    status!: string

    @Column({ type: 'int', nullable: true })
    contractNumber?: number

    @Column({ type: 'date', nullable: true })
    contractDate?: Date

    @Column({ type: 'int', unsigned: true, nullable: false })
    agentId!: number

    @Column({ type: 'int', unsigned: true, nullable: false })
    propertyId!: number

    @Column({ type: 'datetime', nullable: false })
    dateTimeFrom!: Date

    @Column({ type: 'int', unsigned: true, nullable: false })
    clientId!: number

    @OneToMany(() => Warranty, warranty => warranty.contractRequest)
    warranties!: Warranty[]

    @OneToMany(() => Payment, payment => payment.contractRequest)
    payments!: Payment[]

    @ManyToOne(() => Person, { nullable: false })
    @JoinColumn({ name: 'clientId' })
    client!: Person;

    @ManyToOne(() => AssignedAgent, { nullable: false })
    @JoinColumn([
        { name: 'agentId', referencedColumnName: 'agentId' },
        { name: 'propertyId', referencedColumnName: 'propertyId' },
        { name: 'assignmentStartDateTime', referencedColumnName: 'dateTimeFrom' }
    ])
    assignedAgent!: AssignedAgent;
}