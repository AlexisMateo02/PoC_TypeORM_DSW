import 'reflect-metadata'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

dotenv.config()

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: ['dist/**/*.entity.js'],
	migrations: ['dist/migrations/*.js'],
	logger: 'advanced-console',
	logging: true,
	namingStrategy: new SnakeNamingStrategy(),
	synchronize: process.env.NODE_ENV === 'develoment',
	migrationsRun: false,
})

export const initializeDatabase = async () => {
	try {
		await AppDataSource.initialize()
		console.log('Base de datos inicializada correctamente')
	} catch (error) {
		console.error('Error durante la inicialización de la base de datos:', error)
	}
}
