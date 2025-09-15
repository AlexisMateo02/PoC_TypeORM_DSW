import { TestSeeder } from './TestSeeder.js'
import { SeederWithTransaction } from './SeederWithTransaction.js'

export const SEEDERS = {
	test: TestSeeder,
	test2: SeederWithTransaction,
} as const

export type SeederName = keyof typeof SEEDERS

export const getAllSeederNames = (): SeederName[] => {
	return Object.keys(SEEDERS) as SeederName[]
}
