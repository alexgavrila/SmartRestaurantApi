import Sequelize from 'sequelize';
import db from '#database';
import { User } from '.';

const { DataTypes, Model } = Sequelize;

class Restaurant extends Model {}

Restaurant.init(
	{
		// Model attributes are defined here
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		picture: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize: db,
	}
);

Restaurant.belongsTo(User, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE',
	as: 'owner',
});

export default Restaurant;
