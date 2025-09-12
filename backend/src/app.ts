import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { error, success } from './shared/errors/httpResponses.js'
import { productRouter } from './product/product.routes.js'
import { categoryRouter } from './category/category.routes.js'
import { tagRouter } from './tag/tag.routes.js'
import { syncSchema } from './shared/db/orm.js'

dotenv.config()
const port: number = Number(process.env.PORT) || 3000

//! Middleware base que transforma el req.body a JSON
const app: express.Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
}))

//TODO: TypeORM no necesita el equivalente al RequestContext.create de MikroORM
//TODO: TypeORM maneja las conexiones internamente

//! Rutas específicas
app.use('/api/products', productRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/tags', tagRouter)

app.use((_, res) => {
	return error.NotFound(res)
})

await syncSchema() //! Utilizar solo para el desarrollo; nunca en producción

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}/`)
})
