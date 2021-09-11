import { Sequelize } from 'sequelize';

const dbOptions = {};

const sequelize = new Sequelize('restaurant', 'newuser', 'password', {
	host: '172.25.219.165',
	dialect: 'mysql',
	logging: false,
});

export const syncDb = () => {
	console.log('[DB] Started database sync');
	return sequelize.sync({ force: false, alter: true });
};

export default sequelize;
