import Menu from '#models/Menu.model';
import { response } from 'express';

export const paramMenuId = async (req, res, next) => {
	const { menuId: id } = req.params;
	let menu = null;
	try {
		menu = await Menu.findOne({
			where: { id },
		});
	} catch (e) {
		next(e);
	}
	req.menu = menu;
	next();
};

export const getMenu = (req, res) => {
	const { menu } = req;

	const response = { data: menu };

	if (!response.data) {
		response.errors = [
			{
				message: 'Menu not found!',
			},
		];

		res.status(404);
	}

	res.json(response);
};

export const getMenus = async (req, res) => {
	const { menu, user } = req;
	const where = {};
	const respnse = {};
	if (!user.isAdmin()) {
		where.ownerId = user.id;
	}

	try {
		response.data = await Menus.findAll({
			where,
		});
	} catch (e) {
		const { path, message } = e;
		response = { name: path, message: message };
		res.status(400);
	}

	res.json(response);
};

export const createMenu = async (req, res) => {
	const { name, restaurantId } = req.body || {};
	let response = {};
	try {
		response = await Menu.create({
			name: name,
			RestaurantId: restaurantId,
		});
	} catch (e) {
		const { path, message } = e;
		response = { name: path, message: message };
		res.status(400);
	}

	res.send(response);
};

export const checkPermission = async (req, res, next) => {
	const { menu, user } = req;
	const restaurant = await menu.getRestaurant();
	switch (true) {
		case user.id == restaurant.ownerId:
		case user.isAdmin():
			return next();
		default:
			return res.status(401).json({ message: 'You do not have access' });
	}
};
