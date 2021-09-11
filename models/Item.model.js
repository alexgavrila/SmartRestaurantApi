import Sequelize from 'sequelize';
import db from '#database';

const { DataTypes, Model } = Sequelize;

class Item extends Model {}

Item.init(
	{
		// Model attributes are defined here
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		picture: {
			type: DataTypes.STRING,
		},
		price: {
			type: DataTypes.FLOAT,
		},
	},
	{
		sequelize: db,
	}
);

export default Item;
