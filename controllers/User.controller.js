import { UserService } from '#services';

export const getUser = async (req, res, next) => {
	const { userId } = req.params || {};

	try {
		const user = await UserService.getById(userId);
		return res.json(user);
	} catch (e) {
		return next(e);
	}
};

export const createUser = async (req, res, next) => {
	const { email, password } = req.body || {};
	try {
		const user = await UserService.create({ email, password });
		return res.json({ user });
	} catch (e) {
		return next(e);
	}
};

export const editUser = async (req, res, next) => {
	const body = req.body;

	const updateObject = {};
	const keys = ['email', 'displayName', 'password'];

	const { userId } = req.params;

	let id = 0;
	if (userId == 'me') {
		id = req.user.id;
	} else {
		id = userId;
	}

	keys.forEach(item => {
		if (!body.hasOwnProperty(item)) {
			return;
		}

		updateObject[item] = body[item];
	});

	try {
		const user = await UserService.edit(id, updateObject);
		return res.json(user);
	} catch (e) {
		return next(e);
	}
};

export const checkPermission = async (req, res, next) => {
	const { user } = req;
	const { userId } = req.params;

	switch (true) {
		case user.id == userId:
		case user.isAdmin():
		case userId.toLowerCase() == 'me':
			return next();
		default:
			return res.status(401).json({ message: 'You do not have access' });
	}
};
