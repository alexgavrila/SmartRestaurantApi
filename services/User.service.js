import User from '#models/User.model';

class UserService {
	static async getById(id) {
		try {
			const user = await User.findByPk(id);

			if (!user) {
				throw Error('No user found!');
			}

			return user;
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async getOneWhere(whereObject) {
		try {
			const user = await User.findOne({ where: whereObject });

			return user;
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async create({ email, password }) {
		try {
			if (await UserService.getOneWhere({ email })) {
				throw Error('This email already exists');
			}

			return await User.create({
				email,
				password,
			});
		} catch (e) {
			throw Error(e.message);
		}
	}

	static async edit(id, updateObject) {
		try {
			await User.update(updateObject, {
				where: { id },
			});

			return await UserService.getById(id);
		} catch (e) {
			throw Error(e.message);
		}
	}
}

export default UserService;
