import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Person } from "../entities/Person";
import { Property } from "../property/property.entity.js";

@Entity()
export class PropertyOwner extends BaseEntity {
    @PrimaryColumn()
    ownerId!: number;

    @PrimaryColumn()
    propertyId!: number;

    @ManyToOne(() => Property, { nullable: false })
    @JoinColumn({ name: 'propertyId' })
    property!: Property

    @ManyToOne(() => Person, { nullable: false })
    @JoinColumn({ name: 'ownerId' })
    owner!: Person
}