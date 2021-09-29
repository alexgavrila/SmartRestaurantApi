import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';

import injectRoutes from './utils/injectRoultes';
import routes from './routes/index';
import { syncDb } from '#database';

// create config before anything else
import { config } from 'dotenv';
config();
// create app
const app = express();

// middleware
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

// session manager based on ENV
// will probably change to use a DB Store on PROD
// filestore for ease on DEV
if (app.get('env') === 'PROD') {
	app.use(
		session({
			secret: process.env.SECRET,
			resave: true,
			saveUninitialized: false,
		})
	);
} else if (app.get('env') === 'DEV') {
	// import FileStore from 'session-file-store';
	const FileStore = (await import('session-file-store')).default(session);
	app.use(
		session({
			store: new FileStore({
				retries: 0,
			}),
			secret: process.env.SECRET,
			resave: true,
			saveUninitialized: false,
		})
	);
} else {
	console.log('ENV NOT SET');
	process.exit(1);
}

// authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// print requests to console
app.use((req, res, next) => {
	console.log(req.method, req.path);
	next();
});

app.get('/', (req, res) => {
	res.send('Index');
});

const startService = async () => {
	console.log('[INDEX] Starting service');
	try {
		await syncDb();
		await setupServer();
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};

const setupServer = () => {
	return new Promise(resolve => {
		console.log('[INDEX] Starting server');

		// inject routes
		injectRoutes(app, routes, '/api');

		//error handle
		app.use(function (err, req, res, next) {
			console.error(err);
			return res.status(400).json({ message: err.message });
		});

		app.listen(process.env.SERVER_PORT, () => {
			console.log(
				`[INDEX] Server is listening on port ${process.env.SERVER_PORT}`
			);
			resolve();
		});
	});
};

startService();
