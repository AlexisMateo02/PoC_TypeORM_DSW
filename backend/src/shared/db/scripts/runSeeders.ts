import 'reflect-metadata'
import { AppDataSource } from '../orm.js'
import { SEEDERS, getAllSeederNames } from '../seeders/index.js'

async function runSeeders() {
	try {
		if (!AppDataSource.isInitialized) {
			await AppDataSource.initialize()
		}

		console.log('Ejecutando seeders...')

		const seederNames = getAllSeederNames()

		for (const seederName of seederNames) {
			console.log(`\nEjecutando: ${seederName}`)

			const SeederClass = SEEDERS[seederName]
			const seederInstance = new SeederClass()

			await seederInstance.run()
		}

		console.log('Todos los seeders ejecutados correctamente')
	} catch (error) {
		console.error('Error ejecutando seeders:', error)
		process.exit(1)
	} finally {
		if (AppDataSource.isInitialized) {
			await AppDataSource.destroy()
		}
		process.exit(0)
	}
}

runSeeders()
