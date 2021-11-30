import Sequelize from 'sequelize';
import db from '#database';
import Category from './Category.model';

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

Item.belongsTo(Category, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE',
});

export default Item;
