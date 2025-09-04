import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from '../shared/db/baseEntity.js'
import { AssignedAgent } from '../assignedAgent/assignedAgent.entity.js'
import { Warranty } from '../warranty/warranty.entity.js'
import { PropertyOwner } from '../propertyOwner/propertyOwner.entity.js'
import { ContractRequest } from '../contractRequest/contractRequest.entity.js'
import { Visit } from '../visit/visit.entity.js'

@Entity('persona')
export class Person extends BaseEntity {
  @Column({ type: 'varchar', length: 45, nullable: false })
  documentType!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  documentNumber!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  address!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  phone!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  email!: string

  @Column({ type: 'varchar', length: 14, nullable: true })
  cuil?: string

  @Column({ type: 'varchar', length: 5, nullable: true })
  license?: string

  @OneToMany(() => AssignedAgent, assignedAgent => assignedAgent.agent)
  assignedAgents!: AssignedAgent[]

  @OneToMany(() => Warranty, warranty => warranty.guarantor)
  warranties!: Warranty[]

  @OneToMany(() => PropertyOwner, propertyOwner => propertyOwner.owner)
  ownedProperties!: PropertyOwner[]

  @OneToMany(() => ContractRequest, contractRequest => contractRequest.client)
  contractRequests!: ContractRequest[]

  @OneToMany(() => Visit, visit => visit.client)
  visits!: Visit[]
}