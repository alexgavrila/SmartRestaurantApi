import { Router } from 'express';
import {
	createUser,
	getUser,
	checkPermission,
	editUser,
} from '#controllers/User.controller.js';
import { isAuthenticated } from '#controllers/Auth.controller';

const router = Router();

router.get('/', isAuthenticated, (req, res) => {
	res.send(`First Route Index`);
});
router.get('/:userId', isAuthenticated, checkPermission, getUser);

router.post('/', createUser);

router.put('/:userId', isAuthenticated, checkPermission, editUser);

export default {
	namespace: '/user',
	router: router,
};
