import 'reflect-metadata'
import express from 'express'
import { productRouter } from './product/product.routes.js'
import { categoryRouter } from './category/category.routes.js'
import { tagRouter } from './tag/tag.routes.js'
import { syncSchema } from './shared/db/orm.js'
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000

//! Middleware base que transforma el req.body a JSON
const app = express()
app.use(express.json())

//TODO: TypeORM no necesita el equivalente al RequestContext.create de MikroORM
//TODO: TypeORM maneja las conexiones internamente

//! Rutas específicas
app.use('/api/products', productRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/tags', tagRouter)

app.use((_, res) => {
	return res.status(404).send({ message: 'Resource not found' })
})

await syncSchema() //! Utilizar solo para el desarrollo; nunca en producción

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}/`)
})
