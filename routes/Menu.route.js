import { isAuthenticated } from '#controllers/Auth.controller';
import {
	checkPermission,
	createMenu,
	getMenu,
	getMenus,
	paramMenuId,
} from '#controllers/Menu.controller';

import { Router } from 'express';
import CategoryRoute from './Category.route';

const router = Router({ mergeParams: true });

router.use(isAuthenticated);

router.get('/', getMenus);

router.get('/:menuId', checkPermission, getMenu);

router.post('/', createMenu);

router.param('menuId', paramMenuId);

// nested route
router.use(CategoryRoute.namespace, CategoryRoute.router);

export default {
	namespace: '/:restaurantId/menus',
	router: router,
};
