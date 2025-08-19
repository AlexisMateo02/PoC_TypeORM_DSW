import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

export const orm = new DataSource({
	//TODO: Configuración básica del ORM
	entities: ['dist/**/*.entity.js'],
	type: 'mysql',
	url: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
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
