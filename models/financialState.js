var mongoose = require("mongoose");
var financialStateSchema = mongoose.Schema({
	owner: String,
	dailyStatus: [{
		updated_time: { type: Date, default: Date.now },
		banks: [{
			name: String,
			amount: Number,
			credit: Number
		}],
		credit_cards: [{
			name: String,
			credit: Number,
			charge_date: Date
		}]
	}],
	income: [{
		bank_name: String,
		amount: Number,
		income_day: Number
	}]
});
module.exports = mongoose.model("FinancialState", financialStateSchema);