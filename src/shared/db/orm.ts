import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

export const orm = new DataSource({
	//TODO: Configuración básica del ORM
	type: 'mysql',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: ['dist/**/*.entity.js'],
	logger: 'advanced-console',
	logging: true,
	//TODO Configuración del ORM para generar el esquema en la BD
	//! Utilizar solo para el desarrollo; nunca en producción
	synchronize: true,
})

export const syncSchema = async () => {
	if (!orm.isInitialized) {
		await orm.initialize()
		console.log('✅ TypeORM inicializado correctamente')
	}
	//! En TypeORM, "synchronize: true" hace sincroniza el Schema automáticamente
	//! Pero si se necesita control manual:
	//! await orm.synchronize();
}
