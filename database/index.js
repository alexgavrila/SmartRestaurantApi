import { Sequelize } from 'sequelize';

// create config before anything else
import { config } from 'dotenv';
config();

const dbOptions = {};
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: 'postgres',
		logging: false,
	}
);

export const syncDb = () => {
	console.log('[DB] Started database sync');
	return sequelize.sync({ force: false, alter: true });
};

export default sequelize;
