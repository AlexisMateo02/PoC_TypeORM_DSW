import 'reflect-metadata'
import express from 'express'
import { productRouter } from './product/product.routes.js'
import { categoryRouter } from './category/category.routes.js'
import { tagRouter } from './tag/tag.routes.js'
import { syncSchema } from './shared/db/orm.js'

const app = express()
app.use(express.json())

//! Luego de los middlewares base, como el de express.json()

//TODO: TypeORM no necesita el equivalente al RequestContext.create de MikroORM
//TODO: TypeORM maneja las conexiones internamente

//! Antes de las rutas específicas y middlewares de negocio

app.use('/api/products', productRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/tags', tagRouter)

app.use((_, res) => {
	return res.status(404).send({ message: 'Resource not found' })
})

await syncSchema() //! Utilizar solo para el desarrollo; nunca en producción

app.listen(3000, () => {
	console.log(`Server running on http://localhost:3000/`)
})
