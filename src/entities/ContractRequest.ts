import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, OneToMany } from "typeorm";
import { Person } from "./Person";
import { AssignedAgent } from "./AssignedAgent";
import { Property } from "./Property";


@Entity()
export class ContractRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date' })
    requestDate!: Date;

    @Column('decimal', { precision: 15, scale: 2 })
    monthlyAmount!: number;

    @Column({ length: 500, nullable: true })
    contractFilePath?: string;

    @Column({ length: 50 })
    status!: string;

    @Column({ length: 50, nullable: true })
    number?: string;

    @Column({ type: 'date', nullable: true })
    contractDate?: Date;

    @Column() agentId!: number;
    @Column() propertyId!: number;
    @Column({ type: 'datetime' }) assignmentStartDateTime!: Date;
    @Column() clientId!: number;

    
    @ManyToOne(() => Property, property => property.contractRequests)
    @JoinColumn({ name: 'propertyId' })
    property!: Property;

    @ManyToOne(() => Person, person => person.contractRequestsAsClient)
    @JoinColumn({ name: 'clientId' })
    client!: Person;

    @ManyToOne(() => AssignedAgent)
    @JoinColumn([
        { name: 'agentId', referencedColumnName: 'agentId' },
        { name: 'propertyId', referencedColumnName: 'propertyId' },
        { name: 'assignmentStartDateTime', referencedColumnName: 'startDateTime' }
    ])
    assignedAgent!: AssignedAgent;
}