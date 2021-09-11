import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';

import injectRoutes from './utils/injectRoultes';
import routes from './routes/index';
import { syncDb } from '#database';

// config stuff
const PORT = 3001;
const SECRET = 'bigsecret';

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
app.use(session({ secret: SECRET, resave: true, saveUninitialized: false }));

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

//error handle
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send({ message: 'Something broke!' });
});

const startService = async () => {
	console.log('[INDEX] Starting service');
	try {
		await setupServer();
		await syncDb();
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

		app.listen(PORT, () => {
			console.log(`[INDEX] Server is listening on port ${PORT}`);
			resolve();
		});
	});
};

startService();
