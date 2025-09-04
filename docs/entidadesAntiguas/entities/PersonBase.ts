import { Column } from "typeorm";

export class PersonBase {
    @Column({ length: 20 })
    documentType!: string;

    @Column({ length: 50 })
    documentNumber!: string;

    @Column({ length: 100 })
    firstName!: string;

    @Column({ length: 100 })
    lastName!: string;

    @Column({ length: 200 })
    address!: string;

    @Column({ length: 50 })
    phone!: string;

    @Column({ length: 150 })
    email!: string;

    @Column({ length: 20, nullable: true })
    cuil?: string;
}