import { isAuthenticated } from '#controllers/Auth.controller';
import {
	createRestaurant,
	getRestaurant,
	getRestaurants,
	checkPermission,
	paramRestaurantId,
	editRestaurant,
} from '#controllers/Restaurant.controller';
import { Router } from 'express';
import multer from 'multer';

import MenuRoute from './Menu.route';

const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './uploads/restaurant/');
		},
		filename: function (req, file, cb) {
			const extension = file.originalname.split('.').pop();
			const uniqueFilename =
				Date.now() + '-' + Math.round(Math.random() * 1e9);
			cb(null, uniqueFilename + '.' + extension);
		},
	}),
});

const router = Router({ mergeParams: true });

router.use(isAuthenticated);

router.get('/:restaurantId', checkPermission, getRestaurant);

router.get('/', getRestaurants);

router.post('/', upload.single('picture'), createRestaurant);

router.put(
	'/:restaurantId',
	checkPermission,
	upload.single('picture'),
	editRestaurant
);

router.param('restaurantId', paramRestaurantId);

// nested route
router.use(MenuRoute.namespace, MenuRoute.router);

export default {
	namespace: '/restaurants',
	router: router,
};
