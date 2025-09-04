import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Person } from "./Person";
import { Property } from "./Property";

@Entity()
export class AssignedAgent extends BaseEntity {
    @PrimaryColumn()
    agentId!: number;

    @PrimaryColumn()
    propertyId!: number;

    @PrimaryColumn({ type: 'datetime' })
    startDateTime!: Date;

    @Column({ type: 'datetime', nullable: true })
    endDateTime?: Date;

    @ManyToOne(() => Person, person => person.agentAssignments)
    @JoinColumn({ name: 'agentId' })
    agent!: Person;

    @ManyToOne(() => Property, property => property.assignedAgents)
    @JoinColumn({ name: 'propertyId' })
    property!: Property;
}