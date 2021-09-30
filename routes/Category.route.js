import { isAuthenticated } from '#controllers/Auth.controller';
import {
	checkPermission,
	createCategory,
	getCategory,
	getCategories,
	paramCategoryId,
} from '#controllers/Category.controller';

import { Router } from 'express';

const router = Router({ mergeParams: true });

router.use(isAuthenticated);

router.get('/', getCategories);

router.get('/:categoryId', checkPermission, getCategory);

router.post('/', createCategory);

router.param('categoryId', paramCategoryId);

export default {
	namespace: '/:menuId/categories',
	router: router,
};
