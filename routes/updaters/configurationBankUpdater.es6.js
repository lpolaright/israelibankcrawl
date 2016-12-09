let FinancialState = require('../../models/financialState');

module.exports = class ConfigurationBankUpdater {
	constructor(logger) {
		this.logger = logger;
		this.FinancialState = FinancialState;
	}

	update(request, response, next) {
		this.FinancialState.findOne({ 'owner': 'all' }, (err, financialState) => {
			if (err) next(err);
			if (financialState) {
				let financialStateConfiguration = financialState.configuration || {};
				let financialStateBanksConfiguration = financialStateConfiguration.banks || [];
				financialStateBanksConfiguration.push(request.body);
				console.log(financialStateConfiguration);

				FinancialState.findByIdAndUpdate(financialState.id, { $set: { "configuration.banks": financialStateBanksConfiguration } },
					(updateError, updateDocument) => {
						if (updateError) {
							response.status(500).json(error);
						}
						response.status(200).json(updateDocument);
					});
			} else {
				response.status(500).json({ "error": "Could not find financial state with owner of 'all'" });
			}
		});


	}
}