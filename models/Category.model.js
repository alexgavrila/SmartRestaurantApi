import Sequelize from 'sequelize';
import db from '#database';
import Menu from './Menu.model';

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

Category.belongsTo(Menu, {
	foreignKey: { allowNull: false },
	onDelete: 'CASCADE',
});

export default Category;
