import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../shared/db/baseEntity.js";
import { AssignedAgent } from "../assignedAgent/assignedAgent.entity.js";
import { PropertyCharacteristic } from "../propertyCharacteristic/propertyCharacteristic.entity.js";
import { Room } from "../room/room.entity.js";
import { PropertyValue } from "../propertyValue/propertyValue.entity.js";
import { PropertyOwner } from "../propertyOwner/propertyOwner.entity";

@Entity()
export class Property extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    address!: string;

    @Column({ type: 'text', nullable: true })
    gpsLocation?: string;

    @Column({ type: 'int', nullable: false })
    constructionYear!: number

    @Column({ type: 'varchar', length: 255, nullable: false })
    type!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    zone!: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    status!: string;
    
    @OneToMany(() => AssignedAgent, assignedAgent => assignedAgent.property)
    assignedAgents!: AssignedAgent[]

    @OneToMany(() => PropertyCharacteristic, propertyCharacteristic => propertyCharacteristic.property)
    characteristics!: PropertyCharacteristic[]

    @OneToMany(() => Room, room => room.property)
    rooms!: Room[]

    @OneToMany(() => PropertyOwner, propertyOwner => propertyOwner.property)
    owners!: PropertyOwner[]

    @OneToMany(() => PropertyValue, propertyValue => propertyValue.property)
    values!: PropertyValue[]
}