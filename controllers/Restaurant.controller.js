import { Restaurant } from '#models';
import { User } from '#models';
import { response } from 'express';

export const paramRestaurantId = async (req, res, next) => {
	const { restaurantId: id } = req.params;
	let restaurant = null;
	try {
		restaurant = await Restaurant.findOne({
			where: { id },
		});
	} catch (e) {
		next(e);
	}
	req.restaurant = restaurant;
	next();
};

export const getRestaurant = (req, res) => {
	const { restaurant } = req;

	const response = { data: restaurant };

	if (!response.data) {
		response.errors = [
			{
				message: 'Restaurant not found!',
			},
		];

		res.status(404);
	}

	res.json(response);
};

export const getRestaurants = async (req, res) => {
	const { restaurant, user } = req;
	const where = {};
	const respnse = {};
	if (!user.isAdmin()) {
		where.ownerId = user.id;
	}

	try {
		response.data = await Restaurant.findAll({
			where,
		});
	} catch (e) {
		const { path, message } = e;
		response = { name: path, message: message };
		res.status(400);
	}

	res.json(response);
};

export const createRestaurant = async (req, res) => {
	const { name } = req.body || {};

	let response = {};
	try {
		response = await Restaurant.create({
			name: name,
			ownerId: req.user.id,
		});
	} catch (e) {
		const { path, message } = e;
		response = { name: path, message: message };
		res.status(400);
	}

	res.send(response);
};

export const checkPermission = async (req, res, next) => {
	const { restaurant, user } = req;

	switch (true) {
		case user.id == restaurant.ownerId:
		case user.isAdmin():
			return next();
		default:
			return res.status(401).json({ message: 'You do not have access' });
	}
};
