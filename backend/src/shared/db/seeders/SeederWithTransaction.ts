import { AppDataSource } from '../orm.js'
import { Product } from '../../../product/product.entity.js'
import { Category } from '../../../category/category.entity.js'
import { Tag } from '../../../tag/tag.entity.js'

export class SeederWithTransaction {
	async run(): Promise<void> {
		await AppDataSource.transaction(async manager => {
			const existingProduct = await Product.findOne({
				where: { name: 'Coca Cola Zero 1,75L' },
			})

			if (existingProduct) {
				console.log('Los datos de prueba ya existen')
				return
			}

			const categoryData = {
				name: 'Bebidas',
				description: 'Jugos, aguas y gaseosas',
			}
			const category = new Category()
			Object.assign(category, categoryData)
			await manager.save(category)

			const tag1 = new Tag()
			Object.assign(tag1, {
				name: 'Sin Azúcar',
				description: 'Sin azúcares añadidos',
				color: '#0891B2',
			})

			const tag2 = new Tag()
			Object.assign(tag2, {
				name: 'Sin Lactosa',
				description: 'Apto para intolerantes a la lactosa',
				color: '#2563EB',
			})

			await manager.save([tag1, tag2])

			const product1 = new Product()
			Object.assign(product1, {
				name: 'Coca Cola Zero 1,75L',
				price: 3914.0,
				description: 'Gaseosa sin azúcar',
				stock: 150,
				category: category,
				tags: [tag1],
			})

			const product2 = new Product()
			Object.assign(product2, {
				name: 'Leche Deslactosada',
				price: 2608.5,
				description: 'Leche sin lactosa',
				stock: 100,
				category: category,
				tags: [tag2],
			})

			await manager.save([product1, product2])
		})

		console.log('SeederWithTransaction ejecutado correctamente')
	}
}
