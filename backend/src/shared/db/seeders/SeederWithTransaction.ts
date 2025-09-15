import { EntityManager } from 'typeorm'
import { Product } from '../../../product/product.entity.js'
import { Category } from '../../../category/category.entity.js'
import { Tag } from '../../../tag/tag.entity.js'

export class SeederWithTransaction {
	async run(em: EntityManager): Promise<void> {
		await em.transaction(async transactionalEM => {
			const existingProduct = await transactionalEM.findOne(Product, {
				where: { name: 'Test Product 1' },
			})

			if (existingProduct) {
				console.log('Los datos de prueba ya existen')
				return
			}

			const categories = [
				transactionalEM.create(Category, {
					name: 'Bebidas',
					description: 'Jugos, aguas y gaseosas',
				}),
			]
			await transactionalEM.save(categories)

			const tags = [
				transactionalEM.create(Tag, {
					name: 'Sin Azúcar',
					description: 'Sin azúcares añadidos',
					color: '#0891B2',
				}),
				transactionalEM.create(Tag, {
					name: 'Sin Lactosa',
					description: 'Apto para intolerantes a lactosa',
					color: '#2563EB',
				}),
			]
			await transactionalEM.save(tags)

			const products = [
				transactionalEM.create(Product, {
					name: 'Coca Cola Zero 1,75L',
					price: 3914.0,
					description: 'Gaseosa sin azúcar',
					stock: 150,
					category: categories[0],
					tags: [tags[0]],
				}),
				transactionalEM.create(Product, {
					name: 'Leche Deslactosada',
					price: 2608.5,
					description: 'Leche sin lactosa',
					stock: 100,
					category: categories[0],
					tags: [tags[1]],
				}),
			]
			await transactionalEM.save(products)
		})

		console.log('SeederWithTransaction ejecutado correctamente')
	}
}
