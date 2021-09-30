import { RestaurantService } from '#services';

export const paramRestaurantId = async (req, res, next) => {
	const { restaurantId } = req.params;
	try {
		const restaurant = await RestaurantService.getById(restaurantId);

		req.restaurant = restaurant;

		return next();
	} catch (e) {
		return next(e);
	}
};

export const getRestaurant = (req, res) => {
	const { restaurant } = req || {};

	res.json(restaurant);
};

export const getRestaurants = async (req, res, next) => {
	const { user } = req || {};

	const where = {};

	if (!user.isAdmin()) {
		where.OwnerId = user.id;
	}

	try {
		const restaurants = await RestaurantService.getAll(where);

		return res.json(restaurants);
	} catch (e) {
		return next(e);
	}
};

export const createRestaurant = async (req, res, next) => {
	const { name } = req.body || {};
	const { path } = req.file || {};

	try {
		const restaurant = await RestaurantService.create({
			name,
			ownerId: req.user.id,
			picture: path,
		});

		return res.json({ restaurant });
	} catch (e) {
		return next(e);
	}
};

export const editRestaurant = async (req, res) => {
	const { body } = req || {};
	const { path } = req.file || {};

	const updateObject = {};
	const keys = ['name'];

	const { restaurantId } = req.params || {};

	keys.forEach(item => {
		if (!Object.prototype.hasOwnProperty.call(body, item)) {
			return;
		}

		updateObject[item] = body[item];
	});

	if (path) {
		updateObject.picture = path;
	}

	try {
		const restaurant = await RestaurantService.edit(
			restaurantId,
			updateObject
		);
		return res.json(restaurant);
	} catch (e) {
		return next(e);
	}
};

export const checkPermission = async (req, res, next) => {
	const { restaurant, user } = req || {};

	switch (true) {
		case user.id == restaurant.ownerId:
		case user.isAdmin():
			return next();
		default:
			return res.status(401).json({ message: 'You do not have access' });
	}
};
