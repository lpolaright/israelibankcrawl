export class FinancialStateController {
	/**
	 * @param {statusFetchingService} statusFetchingService
	 */
	constructor(statusFetchingService) {
		this.statusFetchingService = statusFetchingService;
	}

	/**
	 * @param {jQuery} $statusFetchingElement
	 * @param {jQuery} $statusUpdatingElement
	 * @param {string} bankName
	 */
	bindFetchingStatusForBank($statusFetchingElement, $statusUpdatingElement, bankName) {
		// The actual binding
		$statusFetchingElement.on("click", () => {
			this.fetchStatusForBank($statusFetchingElement, $statusUpdatingElement, bankName);
		});
	}

	/**
	 * @param {jQuery} $statusFetchingElement
	 * @param {jQuery} $statusUpdatingElement
	 * @param {string} bankName
	 */
	fetchStatusForBank($statusFetchingElement, $statusUpdatingElement, bankName) {
		let $fetchingStatusButtons = jQuery('.fetching-status').find('.btn');
		$fetchingStatusButtons.prop('disabled', true);
		let $spinnerElements = $statusUpdatingElement.find('.spinner');
		$spinnerElements.show();
		$statusFetchingElement.removeClass("btn-raised");
		let fetchedStatusPromise = this.statusFetchingService.fetchStatusForBank(bankName);
		fetchedStatusPromise.then((result) => {
			$statusUpdatingElement.find('.panel-success').find('.panel-body').text(result.amount);
			$statusUpdatingElement.find('.panel-danger').find('.panel-body').text(result.credit);
			$statusFetchingElement.addClass("btn-raised");
			$fetchingStatusButtons.prop('disabled', false);
			$spinnerElements.hide();
		});
	}
}
