let FinancialState = require('../../models/financialState');

module.exports = class ConfigurationController {
	constructor(logger) {
		this.logger = logger;
		this.FinancialState = FinancialState;
	}

	render(request, response, next) {
		this.FinancialState.findOne({ 'owner': 'all' }, (err, financialState) => {
			if (err) next(err);
			if (financialState) {
				let financialConfig = financialState.configuration || {};
				let banksConfig = financialConfig.banks || {};
				response.render('config', { banksConfig: banksConfig });
			} else {
				res.json(500);
			}
		});
	}
}