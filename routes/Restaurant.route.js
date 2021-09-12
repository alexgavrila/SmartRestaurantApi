import { isAuthenticated } from '#controllers/Auth.controller';
import {
	createRestaurant,
	getRestaurant,
	getRestaurants,
	checkPermission,
	paramRestaurantId,
} from '#controllers/Restaurant.controller';
import { Router } from 'express';
import multer from 'multer';

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

const router = Router();

router.use(isAuthenticated);

router.get('/:restaurantId', checkPermission, getRestaurant);

router.get('/', isAuthenticated, getRestaurants);

router.post('/', upload.single('picture'), createRestaurant);

router.param('restaurantId', paramRestaurantId);

export default {
	namespace: '/restaurant',
	router: router,
};
