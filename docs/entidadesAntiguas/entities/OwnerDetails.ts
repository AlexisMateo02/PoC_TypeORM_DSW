import { Column } from "typeorm";

export class OwnerDetails {
    @Column({ type: 'text', nullable: true })
    ownershipDetails?: string;

    @Column({ type: 'date', nullable: true })
    acquisitionDate?: Date;

    @Column('decimal', { precision: 15, scale: 2, nullable: true })
    purchasePrice?: number;
}