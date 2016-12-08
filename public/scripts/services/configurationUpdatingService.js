const ADD_NEW_BANK_CONFIG_API_URL = '/configuration/bank';

export class ConfigurationUpdatingService {
	/**
	 * @param {string} bankName
	 * @return {Promise}
	 */
	addNewBankConfig(bankConfigParams) {
		return jQuery.post(ADD_NEW_BANK_CONFIG_API_URL, bankConfigParams);
	}
}