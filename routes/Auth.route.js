import { Login, Logout } from '#controllers/Auth.controller';
import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post(
	'/login',
	(req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).json({ message: 'Wrong credentials!' });
			}

			req.login(user, function (err) {
				if (err) {
					return next(err);
				}
				next();
			});
		})(req, res, next);
	},
	Login
);

router.get('/logout', Logout);

export default {
	namespace: '/auth',
	router: router,
};
