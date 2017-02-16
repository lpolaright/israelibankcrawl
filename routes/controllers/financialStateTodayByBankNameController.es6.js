let FinancialState = require('../../models/financialState');
let moment = require('moment');
let Promise = require('promise');


const BANK_NAME_TO_CRAWLER_MAPPING = {
    "BankHapoalim": "../../crawlers/bhp_crawler_node",
    "BankDiscount": "../../crawlers/discount_crawler_node"
};

module.exports = class FinancialStateTodayByBankNameController {
    constructor(logger) {
        this.logger = logger;
        this.FinancialState = FinancialState;
    }

    render(request, response, next) {
        let bankName = request.params.bank_name;
        
        this.findDailyStatusToday()
            .then(([financialState, todayStatus]) => {
                if (financialState && todayStatus) {

                    let bankStatus = todayStatus.banks.find((bankStat) => {
                        return bankStat.name === bankName;
                    });

                    // If we found the bank that we wanted, no point in continuing, render
                    // Otherwise, crawl!
                    if (bankStatus) {
                        response.status(200).json(bankStatus);
                    } else {
                        this.crawlBankByName(bankName)
                            .then(this.processCrawlingResponse(financialState, bankName, response, next, todayStatus))
                            .catch(err => next(err));
                    }
                } else {
                    this.findOwner()
                        .then(financialState => {
                            this.crawlBankByName(bankName)
                                .then(this.processCrawlingResponse(financialState, bankName, response, next))
                                .catch((err) => next(err));
                        })
                        .catch(err => next(err))
                }
            })
            .catch(err => next(err));
    }

	/**
	 * @return {Promise}
	 */
    findOwner() {
        return FinancialState.findOne({ 'owner': 'all' });
    }

	/**
	 * @return {Promise}
	 */
    findDailyStatusToday() {
        let today = moment().startOf('day')
        let tomorrow = moment(today).add(1, 'days')

        let promise = new Promise((resolve, reject) => {
            FinancialState.findOne({
                'owner': 'all',
            }).then((financialState) => {
                if (financialState) {
                    let dailyStatus = financialState.dailyStatus;
                    let todayStatus = dailyStatus.find((status) => {
                        let momentStatusTime = moment(status.updated_time);
                        let checking = momentStatusTime >= today && momentStatusTime < tomorrow;
                        return checking;
                    });
                    resolve([financialState, todayStatus]);
                } else {
                    resolve([financialState, undefined]);
                }
            });
        });
        return promise;
    }

	/**
	 * @param {String} bankName
	 * @return {Promise}
	 */
    crawlBankByName(bankName) {
        let crawlerFile = BANK_NAME_TO_CRAWLER_MAPPING[bankName];
        return require(crawlerFile);
    }

	/**
	 * @param {string} bankName
	 * @param {Object} todayStatus
	 * @return {Function}
	 */
    processCrawlingResponse(financialState, bankName, response, next, todayStatus) {
        return (crawlingMoneyStatus) => {
            let didntHaveTodayStatus = !todayStatus; 

            if (didntHaveTodayStatus) {
                todayStatus = {
                    banks: [],
                    credit_cards: []
                }
            }

            let bankStatus = {
                name: bankName,
                amount: parseInt(crawlingMoneyStatus.mainSum.replace(/,/g, ""), 10),
                credit: parseInt(crawlingMoneyStatus.credit.replace(/,/g, ""), 10)
            };
            todayStatus.banks.push(bankStatus);
            if (didntHaveTodayStatus) {
                financialState.dailyStatus.push(todayStatus);
            }

            FinancialState.findByIdAndUpdate(financialState.id, { $set: { "dailyStatus": financialState.dailyStatus } })
                .then(() => {
                    response.status(200).json(bankStatus);
                })
                .catch(err => next(err));
        }
    }
}