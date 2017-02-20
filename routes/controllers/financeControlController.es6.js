
module.exports = class ConfigurationController {
	constructor(logger) {
		this.logger = logger;
	}

	render(request, response, next) {
		response.render('finance_control');
	}
}