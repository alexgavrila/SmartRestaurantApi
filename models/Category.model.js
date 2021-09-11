import Sequelize from 'sequelize';
import db from '#database';

const { DataTypes, Model } = Sequelize;

class Category extends Model {}

Category.init(
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

export default Category;
