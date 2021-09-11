import Sequelize from 'sequelize';
import db from '#database';

const { DataTypes, Model } = Sequelize;

class Menu extends Model {}

Menu.init(
	{
		// Model attributes are defined here
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: db,
	}
);

export default Menu;
