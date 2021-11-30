import Sequelize from 'sequelize';
import db from '#database';
import Restaurant from '#models/Restaurant.model';

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

Menu.belongsTo(Restaurant, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE',
});

export default Menu;
