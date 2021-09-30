import { MenuService } from '#services';

export const paramMenuId = async (req, res, next) => {
	const { menuId } = req.params || {};
	try {
		const menu = await MenuService.getById(menuId);

		req.menu = menu;

		return next();
	} catch (e) {
		return next(e);
	}
};

export const getMenu = (req, res, next) => {
	const { menu } = req || {};

	res.json(menu);
};

export const getMenus = async (req, res, next) => {
	const { restaurantId } = req.params || {};
	try {
		const restaurants = await MenuService.getAll({
			RestaurantId: restaurantId,
		});

		return res.json(restaurants);
	} catch (e) {
		return next(e);
	}
};

export const createMenu = async (req, res, next) => {
	const { name } = req.body || {};
	const { restaurantId } = req.params;

	try {
		const menu = await MenuService.create({
			name,
			RestaurantId: restaurantId,
		});

		return res.json({ menu });
	} catch (e) {
		return next(e);
	}
};

export const checkPermission = async (req, res, next) => {
	const { menu, user, restaurant } = req || {};
	switch (true) {
		case user.id == restaurant.ownerId:
		case user.isAdmin():
			return next();
		default:
			return res.status(401).json({ message: 'You do not have access' });
	}
};
