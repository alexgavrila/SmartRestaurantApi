import Item from '#models/Item.model';

class ItemService {
	static async getById(id) {
		try {
			const item = await Item.findByPk(id);

			if (!item) {
				throw Error('No Item found');
			}

			return item;
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async getAll(where) {
		try {
			const items = await Item.findAll({ where });

			return items;
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async create(createObject) {
		try {
			return await Item.create(createObject);
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async edit(id, updateObject) {
		try {
			await Item.update(updateObject, {
				where: { id },
			});

			return await ItemService.getById(id);
		} catch (e) {
			throw Error(e.message);
		}
	}
}

export default ItemService;
