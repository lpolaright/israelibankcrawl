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
				response.render('config', { financialState: financialState });
			} else {
				res.json(500);
			}
		});
	}
}