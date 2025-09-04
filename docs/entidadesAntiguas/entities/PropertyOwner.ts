import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { Person } from "./Person";
import { Property } from "./Property";

@Entity()
export class PropertyOwner extends BaseEntity {
    @PrimaryColumn()
    ownerId!: number;

    @PrimaryColumn()
    propertyId!: number;

    @ManyToOne(() => Person, person => person.propertiesAsOwner)
    @JoinColumn({ name: 'ownerId' })
    owner!: Person;

    @ManyToOne(() => Property, property => property.owners)
    @JoinColumn({ name: 'propertyId' })
    property!: Property;
}