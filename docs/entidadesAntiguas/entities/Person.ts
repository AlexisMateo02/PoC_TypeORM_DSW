import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { PersonBase } from "./PersonBase";
import { AgentDetails } from "./AgentDetails";
import { OwnerDetails } from "./OwnerDetails";
import { AssignedAgent } from "../assignedAgent/assignedAgent.entity.js";
import { ContractRequest } from "../contractRequest/contractRequest.entity";
import { PropertyOwner } from "../propertyOwner/propertyOwner.entity";

@Entity()
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column(() => PersonBase)
    base!: PersonBase;

    @Column({ type: "varchar", length: 20, default: "client" })
    role!: string;

    @Column(() => AgentDetails, { prefix: "agent_" })
    agentDetails?: AgentDetails;

    @Column(() => OwnerDetails, { prefix: "owner_" })
    ownerDetails?: OwnerDetails;

    @OneToMany(() => AssignedAgent, assignedAgent => assignedAgent.agent)
    agentAssignments!: AssignedAgent[];

    @OneToMany(() => ContractRequest, contractRequest => contractRequest.client)
    contractRequestsAsClient!: ContractRequest[];

    @OneToMany(() => PropertyOwner, propertyOwner => propertyOwner.owner)
    propertiesAsOwner!: PropertyOwner[];

    isAgent(): boolean { return this.role === "agent" && this.agentDetails?.licenseNumber !== undefined; }
    isOwner(): boolean { return this.role === "owner"; }
    isClient(): boolean { return this.role === "client"; }

    get fullName(): string { return `${this.base.firstName} ${this.base.lastName}`; }

    static async findAgents(): Promise<Person[]> {
        return this.find({ where: { role: "agent" } });
    }

    static async createAgent(data: Partial<PersonBase & AgentDetails>): Promise<Person> {
        const person = new Person();
        person.role = "agent";
        person.base = new PersonBase();
        person.agentDetails = new AgentDetails();
        Object.assign(person.base, data);
        Object.assign(person.agentDetails, data);
        return await person.save();
    }

    static async createClient(data: Partial<PersonBase>): Promise<Person> {
        const person = new Person();
        person.role = "client";
        person.base = new PersonBase();
        Object.assign(person.base, data);
        return await person.save();
    }
}