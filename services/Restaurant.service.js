import Restaurant from '#models/Restaurant.model';

class RestaurantService {
	static async getById(id) {
		try {
			const restaurant = await Restaurant.findByPk(id);

			if (!restaurant) {
				throw Error('No restaurant found');
			}

			return restaurant;
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async getAll(where) {
		try {
			const restaurant = await Restaurant.findAll({ where });

			return restaurant;
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async create(createObject) {
		try {
			return await Restaurant.create(createObject);
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async edit(id, updateObject) {
		try {
			await Restaurant.update(updateObject, {
				where: { id },
			});

			return await RestaurantService.getById(id);
		} catch (e) {
			throw Error(e.message);
		}
	}
}

export default RestaurantService;
