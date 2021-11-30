import { Strategy as LocalStrategy } from 'passport-local';
import User from '#models/User.model';
import passport from 'passport';

passport.use(
	new LocalStrategy(
		{ usernameField: 'email' },
		async (email, password, done) => {
			let user = null;
			try {
				user = await User.findOne({ where: { email: email } });
				if (!user) {
					return done(null, false);
				}
				if (!(await user.checkPassword(password))) {
					return done(null, false);
				}

				return done(null, user);
			} catch (e) {
				done(e);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.serialize());
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findOne({ where: { id: id } });
		done(null, user);
	} catch (e) {
		done(e);
	}
});

export const Login = (req, res) => {
	res.json({
		message: 'Successful login!',
	});
};

export const Logout = (req, res) => {
	req.logout();
	res.json({
		message: 'Successful logout!',
	});
};

export const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).json({ message: 'You are not authenticated' });
	}
};
