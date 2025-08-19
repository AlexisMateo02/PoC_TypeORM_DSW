import 'reflect-metadata'
import express from 'express'
import { characterRouter } from './character/character.routes.js'
import { characterClassRouter } from './characterClass/characterClass.routes.js'
import { itemRouter } from './item/item.routes.js'
import { syncSchema } from './shared/db/orm.js'

const app = express()
app.use(express.json())

//! Luego de los middlewares base, como el de express.json()

//TODO: TypeORM no necesita el equivalente al RequestContext.create de MikroORM
//TODO: TypeORM maneja las conexiones internamente

//! Antes de las rutas específicas y middlewares de negocio

app.use('/api/characters', characterRouter)
app.use('/api/characterClasses', characterClassRouter)
app.use('/api/items', itemRouter)

app.use((_, res) => {
	return res.status(404).send({ message: 'Resource not found' })
})

await syncSchema() //! Utilizar solo para el desarrollo; nunca en producción

app.listen(3000, () => {
	console.log(`Server running on http://localhost:3000/`)
})
