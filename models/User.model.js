import Sequelize from 'sequelize';
import db from '#database';
import bcrypt from 'bcrypt';

const { DataTypes, Model } = Sequelize;

class User extends Model {
	serialize() {
		return this.id;
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password);
	}

	static hashPassword(password) {
		return;
	}

	isAdmin() {
		return this.role == 'ADMIN';
	}
}

User.init(
	{
		// Model attributes are defined here
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				args: true,
				name: 'email',
				msg: 'Test',
			},
			validate: {
				isEmail: {
					msg: 'Invalid email address format',
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			// allowNull defaults to true
		},
		displayName: {
			type: DataTypes.STRING,
		},
		activated: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		role: {
			type: DataTypes.STRING,
			defaultValue: 'USER',
		},
	},
	{
		sequelize: db,
		hooks: {
			beforeCreate: async (user, options) => {
				user.password = await bcrypt.hash(user.password, 10);
			},
			afterCreate: user => {
				delete user.dataValues.password;
			},
			afterUpdate: user => {
				delete user.dataValues.password;
			},
		},
	}
);

export default User;
