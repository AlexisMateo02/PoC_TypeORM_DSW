import { Product } from '../../../product/product.entity.js'
import { Category } from '../../../category/category.entity.js'
import { Tag } from '../../../tag/tag.entity.js'

export class TestSeeder {
	async run(): Promise<void> {
		const existingCategories = await Category.count()
		if (existingCategories > 0) {
			console.log('Categories already exist, skipping...')
			return
		}
		const categoryData = {
			name: 'Panadería',
			description: 'Productos de panadería y repostería',
		}
		const category = new Category()
		Object.assign(category, categoryData)
		await category.save()

		const tag1Data = {
			name: 'Keto',
			description: 'Productos bajos en carbohidratos',
			color: '#8B5CF6',
		}

		const tag2Data = {
			name: 'Sin TACC',
			description: 'Productos sin gluten',
			color: '#10B981',
		}

		const tag1 = new Tag()
		Object.assign(tag1, tag1Data)
		await tag1.save()

		const tag2 = new Tag()
		Object.assign(tag2, tag2Data)
		await tag2.save()

		const productData = {
			name: 'Pan Keto',
			price: 4154.5,
			description: 'Pan de harina de almedras bajo en carbohidratos',
			stock: 20,
			category: category,
			tags: [tag1, tag2],
		}

		const product = new Product()
		Object.assign(product, productData)
		await product.save()

		console.log('TestSeeder ejecutado correctamente')
	}
}
