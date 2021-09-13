import { isAuthenticated } from '#controllers/Auth.controller';
import {
	checkPermission,
	createMenu,
	getMenu,
	getMenus,
	paramMenuId,
} from '#controllers/Menu.controller';

import { Router } from 'express';

const router = Router();

router.use(isAuthenticated);

router.get('/:menuId', checkPermission, getMenu);

router.get('/', getMenus);

router.post('/', createMenu);

router.param('menuId', paramMenuId);

export default {
	namespace: '/menu',
	router: router,
};
