import 'reflect-metadata'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

dotenv.config()

//TODO: Configuración del ORM
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
	synchronize: false, //! Utilizar solo para el desarrollo; nunca en producción
	migrationsRun: true,
})

export const initializeDatabase = async () => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize()
		console.log('✅ TypeORM inicializado correctamente')
	}
}
