import Menu from '#models/Menu.model';

class MenuService {
	static async getById(id) {
		try {
			const menu = await Menu.findByPk(id);

			if (!menu) {
				throw Error('No Menu found');
			}

			return menu;
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async getAll(where) {
		try {
			const menus = await Menu.findAll({ where });

			return menus;
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async create(createObject) {
		try {
			return await Menu.create(createObject);
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async edit(id, updateObject) {
		try {
			await Menu.update(updateObject, {
				where: { id },
			});

			return await MenuService.getById(id);
		} catch (e) {
			throw Error(e.message);
		}
	}
}

export default MenuService;
