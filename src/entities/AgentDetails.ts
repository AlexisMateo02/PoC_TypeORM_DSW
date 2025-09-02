import { Column } from "typeorm";

export class AgentDetails {
    @Column({ length: 50, nullable: true })
    licenseNumber?: string;

    @Column({ type: 'date', nullable: true })
    hireDate?: Date;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    salary?: number;

    @Column({ length: 100, nullable: true })
    department?: string;
}