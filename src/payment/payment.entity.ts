import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm'
import { ContractRequest } from '../contractRequest/contractRequest.entity.js'

@Entity()
export class Payment {
  @PrimaryColumn({ type: 'int', unsigned: true })
  contractRequestId!: number

  @PrimaryColumn({ type: 'datetime' })
  paymentDateTime!: Date

  @Column({ type: 'decimal', precision: 12, scale: 3, nullable: false })
  amount!: number

  @Column({ type: 'varchar', length: 50, nullable: false })
  concept!: string

  @ManyToOne(() => ContractRequest, { nullable: false })
  @JoinColumn({ name: 'contractRequestId' })
  contractRequest!: ContractRequest
}