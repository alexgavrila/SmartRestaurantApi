import { CategoryService } from '#services';

export const paramCategoryId = async (req, res, next) => {
	const { categoryId } = req.params || {};
	try {
		const category = await CategoryService.getById(categoryId);

		req.category = category;

		return next();
	} catch (e) {
		return next(e);
	}
};

export const getCategory = (req, res, next) => {
	const { category } = req || {};

	res.json(category);
};

export const getCategories = async (req, res, next) => {
	const { menuId } = req.params || {};
	try {
		const categories = await CategoryService.getAll({
			MenuId: menuId,
		});

		return res.json(categories);
	} catch (e) {
		return next(e);
	}
};

export const createCategory = async (req, res, next) => {
	const { name } = req.body || {};
	const { menuId } = req.params;

	try {
		const category = await CategoryService.create({
			name,
			MenuId: menuId,
		});

		return res.json({ category });
	} catch (e) {
		return next(e);
	}
};

export const checkPermission = async (req, res, next) => {
	const { user, restaurant } = req || {};
	switch (true) {
		case user.id == restaurant.ownerId:
		case user.isAdmin():
			return next();
		default:
			return res.status(401).json({ message: 'You do not have access' });
	}
};
