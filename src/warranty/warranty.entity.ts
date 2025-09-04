import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm'
import { Person } from '../person/person.entity.js'
import { ContractRequest } from '../contractRequest/contractRequest.entity.js'
import { WarrantyType } from '../warrantyType/warrantyType.entity.js'


@Entity()
export class Warranty {
  @PrimaryColumn({ type: 'int', unsigned: true })
  guarantorId!: number

  @PrimaryColumn({ type: 'int', unsigned: true })
  contractRequestId!: number

  @Column({ type: 'int', unsigned: true, nullable: false })
  warrantyTypeId!: number

  @Column({ type: 'date', nullable: false })
  startDate!: Date

  @Column({ type: 'date', nullable: true })
  endDate?: Date

  @Column({ type: 'varchar', length: 20, nullable: false })
  status!: string

  @ManyToOne(() => Person, { nullable: false })
  @JoinColumn({ name: 'guarantorId' })
  guarantor!: Person

  @ManyToOne(() => ContractRequest, { nullable: false })
  @JoinColumn({ name: 'requestId' })
  contractRequest!: ContractRequest

  @ManyToOne(() => WarrantyType, { nullable: false })
  @JoinColumn({ name: 'warrantyTypeId' })
  warrantyType!: WarrantyType
}