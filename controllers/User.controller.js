import { User } from '#models';

export const getUser = async (req, res, next) => {
	const { userId } = req.params || {};

	let response = {};

	try {
		response = await User.findOne({ where: { _id: userId } });
	} catch (e) {
		response = e.message;
		res.status(500);
	}

	res.json(response);
};

export const createUser = async (req, res, next) => {
	const { email, password } = req.body || {};

	let response = {};

	try {
		response.data = await User.create({
			email: email,
			password: password,
		});
	} catch (e) {
		response = {
			errors: e.errors.map(error => {
				let returnObj = {};
				const path = error.path.split('.');

				if (path.length == 1) {
					returnObj = { name: path[0], message: error.message };
				} else {
					const name = path.pop();
					let message = '';

					switch (name) {
						case 'email':
							message = 'The email address is already in use';
							break;
					}

					returnObj = { name, message };
				}

				return returnObj;
			}),
		};

		res.status(400);
	}

	res.json(response);
};

export const editUser = async (req, res) => {
	const body = req.body;

	const updateObject = {};
	const keys = ['email', 'displayName'];

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

	let response = {};

	try {
		await User.update(updateObject, {
			where: { id },
		});

		response = { message: 'The user has been updated' };
	} catch (e) {
		response = e.message;
		res.status(500);
	}

	res.json(response);
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
