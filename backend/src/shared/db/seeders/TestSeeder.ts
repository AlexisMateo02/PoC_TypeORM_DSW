import { EntityManager } from 'typeorm'
import { Product } from '../../../product/product.entity.js'
import { Category } from '../../../category/category.entity.js'
import { Tag } from '../../../tag/tag.entity.js'

export class TestSeeder {
	async run(em: EntityManager): Promise<void> {
		const category = em.create(Category, {
			name: 'Panadería',
			description: 'Productos de panadería y repostería',
		})
		await em.save(category)

		const tag1 = em.create(Tag, {
			name: 'Keto',
			description: 'Productos bajos en carbohidratos',
			color: '#8B5CF6',
		})
		await em.save(tag1)

		const tag2 = em.create(Tag, {
			name: 'Sin TACC',
			description: 'Productos sin gluten',
			color: '#10B981',
		})
		await em.save(tag2)

		const product = em.create(Product, {
			name: 'Pan Integral Keto',
			price: 4154.5,
			description: 'Pan bajo en carbohidratos para dieta cetogénica',
			stock: 20,
			category: category,
			tags: [tag1, tag2],
		})

		await em.save(product)

		console.log('TestSeeder ejecutado correctamente')
	}
}
