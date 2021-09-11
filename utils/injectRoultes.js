import { Router } from 'express';

export default function (app, routes, namespace) {
	const router = Router();
	if (!app) return;

	routes.forEach(element => {
		router.use(element.namespace, element.router);
	});

	if (namespace) {
		app.use(namespace, router);
	} else {
		app.use(router);
	}
}
