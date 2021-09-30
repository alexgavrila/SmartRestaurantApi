import Category from '#models/Category.model';

class CategoryService {
	static async getById(id) {
		try {
			const category = await Category.findByPk(id);

			if (!category) {
				throw Error('No Category found');
			}

			return category;
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async getAll(where) {
		try {
			const categories = await Category.findAll({ where });

			return categories;
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async create(createObject) {
		try {
			return await Category.create(createObject);
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async edit(id, updateObject) {
		try {
			await Category.update(updateObject, {
				where: { id },
			});

			return await CategoryService.getById(id);
		} catch (e) {
			throw Error(e.message);
		}
	}
}

export default CategoryService;
