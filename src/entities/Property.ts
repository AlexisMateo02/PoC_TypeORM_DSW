import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { AssignedAgent } from "./AssignedAgent";
import { ContractRequest } from "./ContractRequest";
import { PropertyOwner } from "./PropertyOwner";

@Entity()
export class Property extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 200 })
    address!: string;

    @Column({ type: 'text', nullable: true })
    gpsLocation!: string;

    @Column({ type: 'int', nullable: true })
    constructionYear?: number;

    @Column({ length: 50 })
    type!: string;

    @Column({ length: 100 })
    zone!: string;

    @Column({ length: 50 })
    status!: string;

    // Relationships
    
    @OneToMany(() => AssignedAgent, assignedAgent => assignedAgent.property)
    assignedAgents!: AssignedAgent[];

    @OneToMany(() => ContractRequest, contractRequest => contractRequest.property)
    contractRequests!: ContractRequest[];

    @OneToMany(() => PropertyOwner, propertyOwner => propertyOwner.property)
    owners!: PropertyOwner[];
}