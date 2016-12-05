let FinancialState = require('../../models/financialState');

module.exports = class FinancialStateTodayController {
	constructor(logger) {
		this.logger = logger;
		this.FinancialState = FinancialState;
	}

	render(request, response, next) {
		this.FinancialState.findOne({ 'owner': 'all' }, (err, financialState) => {
			if (err) next(err);
			if (financialState) {
				let dailyStatuses = financialState.dailyStatus;
				let todayDate = (new Date()).toDateString();
				let todayStatus = dailyStatuses.find(function (dailyStatus) {
					return todayDate === dailyStatus.updated_time.toDateString();
				});
				if (todayStatus) {
					response.render('crawl', { financialState: financialState });
				} else {
					response.render('crawl', { financialState: {} });
				}
			}
		});
	}
}