import 'reflect-metadata'
import { AppDataSource } from '../orm.js'
import { SEEDERS, SeederName } from '../seeders/index.js'

async function runOneSeeder(seederName?: string) {
	try {
		const targetSeeder = seederName || process.argv[2]

		if (!targetSeeder) {
			console.log('Debes especificar un seeder')
			console.log('Seeders disponibles:')
			Object.keys(SEEDERS).forEach(name => {
				console.log(`   - ${name}`)
			})
			console.log('\nUso: pnpm seed:one <nombre_seeder>')
			process.exit(1)
		}

		if (!(targetSeeder in SEEDERS)) {
			console.log(`Seeder '${targetSeeder}' no encontrado`)
			console.log('Seeders disponibles:', Object.keys(SEEDERS).join(', '))
			process.exit(1)
		}

		console.log(`Ejecutando seeder específico: ${targetSeeder}`)

		if (!AppDataSource.isInitialized) {
			await AppDataSource.initialize()
		}

		const SeederClass = SEEDERS[targetSeeder as SeederName]
		const seederInstance = new SeederClass()

		await seederInstance.run()
	} catch (error) {
		console.error('Error ejecutando seeder específico:', error)
		process.exit(1)
	} finally {
		if (AppDataSource.isInitialized) {
			await AppDataSource.destroy()
		}
		process.exit(0)
	}
}

runOneSeeder()
