const ROUTES_AUTO_LOADING_EXCEPTIONS = {
	'/': 'mainIndex.es6'
};

const GET_ROUTES = [
	'/financial-state/today',
	'/financial-state/today/:bank_name',
	'/configuration'
];

const POST_ROUTES = [
	'/configuration/bank',
]

const CONTROLLER_PATH_SUFFIX = 'Controller.es6';
const UPDATER_PATH_SUFFIX = 'Updater.es6';

const CONTROLLERS_PATH = '../../routes/controllers/';
const UPDATERS_PATH = '../../routes/updaters/';

module.exports = class RoutesAutoLoader {
	constructor(router) {
		this.router = router;
	}

	configureRoutes() {
		for (let getRoutePath of GET_ROUTES) {
			this.router.get(getRoutePath, (request, response, next) => {
				this.initiateRouteFunction("GET", getRoutePath, request, response, next);
			});
		}
		for (let postRoutePath of POST_ROUTES) {
			this.router.post(postRoutePath, (request, response, next) => {
				this.initiateRouteFunction("POST", postRoutePath, request, response, next);
			})
		}
	}

	getRoutePathModule(routePath) {
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

	initiateRouteFunction(method, routePath, request, response, next) {
		let routePathModuleName = this.getRoutePathModule(routePath);
		let moduleName = this.capitaliseFirstWord(routePathModuleName);
		console.log(moduleName);
		switch (method) {
			case "GET":
				let controllerPath = CONTROLLERS_PATH + routePathModuleName + CONTROLLER_PATH_SUFFIX;
				let ControllerClass = require(controllerPath);
				console.log("Starting controller: " + routePathModuleName + CONTROLLER_PATH_SUFFIX);
				let controllerInstance = new ControllerClass();
				controllerInstance.render(request, response, next);
				break;
			case "POST":
				let updaterPath = UPDATERS_PATH + routePathModuleName + UPDATER_PATH_SUFFIX;
				let UpaterClass = require(updaterPath);
				console.log("Starting updater: " + routePathModuleName + UPDATER_PATH_SUFFIX);
				let updaterInstance = new UpaterClass();
				updaterInstance.update(request, response, next);
				break;
		}
	}

	capitaliseFirstWord(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
}