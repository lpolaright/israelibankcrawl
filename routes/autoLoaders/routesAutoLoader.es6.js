const ROUTES_AUTO_LOADING_EXCEPTIONS = {
	'/': 'mainIndex.es6'
};

const GET_ROUTES = [
	'/financial-state/today',
	'/financial-state/today/:bank_name'
];

const CONTROLLER_PATH_SUFFIX = 'Controller.es6';

const CONTROLLERS_PATH = '../../routes/controllers/';

module.exports = class RoutesAutoLoader {
	constructor(router) {
		this.router = router;
	}

	configureRoutes() {
		for (let getRoutePath of GET_ROUTES) {
			this.router.get(getRoutePath, (request, response, next) => {
				this.initiateRouteFunction(getRoutePath, request, response, next);
			});
		}
	}

	getRoutePathContoller(routePath) {
		let withoutTrailingSlash = routePath.substring(1);
		let pathWithoutParam = withoutTrailingSlash.replace('/:', '-by-');			// When we have a param, it is by the param
		let underscoresBecomeDashes = pathWithoutParam.replace('_', '-'); 			// Remove underscores for capitalising words
		let slashesBecomeDashes = underscoresBecomeDashes.replace('/', '-');		// Remove slashes for capitalising
		let namesSeparatedByDashesArray = slashesBecomeDashes.split('-');
		let namesCapitalisedArray = [];
		namesSeparatedByDashesArray.forEach((name, index) => {
			if (index > 0) {
				let nameCapitalised = this.capitaliseFirstWord(name);
				namesCapitalisedArray.push(nameCapitalised);
			}
		});
		let controllerName = namesSeparatedByDashesArray[0] + namesCapitalisedArray.join('');
		return controllerName;
	}

	initiateRouteFunction(routePath, request, response, next) {
		let routePathControllerName = this.getRoutePathContoller(routePath);
		let controllerName = this.capitaliseFirstWord(routePathControllerName);
		let controllerPath = CONTROLLERS_PATH + routePathControllerName + CONTROLLER_PATH_SUFFIX;
		let ControllerClass = require(controllerPath);
		let controllerInstance = new ControllerClass();
		controllerInstance.render(request, response, next);
	}

	capitaliseFirstWord(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
}