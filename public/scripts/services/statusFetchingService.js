const STATUS_FETCH_API = '/financial-state/today/'

export class StatusFetchingService {
	/**
	 * @param {string} bankName
	 * @return {Promise}
	 */
	fetchStatusForBank(bankName) {
		let statusFetchingPath = STATUS_FETCH_API + bankName;
		return jQuery.get(statusFetchingPath);
	}
}