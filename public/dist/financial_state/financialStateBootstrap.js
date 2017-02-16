'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FinancialStateController = function () {
	/**
  * @param {statusFetchingService} statusFetchingService
  */
	function FinancialStateController(statusFetchingService) {
		_classCallCheck(this, FinancialStateController);

		this.statusFetchingService = statusFetchingService;
	}

	/**
  * @param {jQuery} $statusFetchingElement
  * @param {jQuery} $statusUpdatingElement
  * @param {string} bankName
  */


	_createClass(FinancialStateController, [{
		key: 'bindFetchingStatusForBank',
		value: function bindFetchingStatusForBank($statusFetchingElement, $statusUpdatingElement, bankName) {
			var _this = this;

			// The actual binding
			$statusFetchingElement.on("click", function () {
				_this.fetchStatusForBank($statusFetchingElement, $statusUpdatingElement, bankName);
			});
		}

		/**
   * @param {jQuery} $statusFetchingElement
   * @param {jQuery} $statusUpdatingElement
   * @param {string} bankName
   */

	}, {
		key: 'fetchStatusForBank',
		value: function fetchStatusForBank($statusFetchingElement, $statusUpdatingElement, bankName) {
			var $fetchingStatusButtons = jQuery('.fetching-status').find('.btn');
			$fetchingStatusButtons.prop('disabled', true);
			var $spinnerElements = $statusUpdatingElement.find('.spinner');
			$spinnerElements.show();
			$statusFetchingElement.removeClass("btn-raised");
			var fetchedStatusPromise = this.statusFetchingService.fetchStatusForBank(bankName);
			fetchedStatusPromise.then(function (result) {
				$statusUpdatingElement.find('.panel-success').find('.panel-body').text(result.amount);
				$statusUpdatingElement.find('.panel-danger').find('.panel-body').text(result.credit);
				$statusFetchingElement.addClass("btn-raised");
				$fetchingStatusButtons.prop('disabled', false);
				$spinnerElements.hide();
			});
		}
	}]);

	return FinancialStateController;
}();

var STATUS_FETCH_API = '/financial-state/today/';

var StatusFetchingService = function () {
	function StatusFetchingService() {
		_classCallCheck(this, StatusFetchingService);
	}

	_createClass(StatusFetchingService, [{
		key: 'fetchStatusForBank',

		/**
   * @param {string} bankName
   * @return {Promise}
   */
		value: function fetchStatusForBank(bankName) {
			var statusFetchingPath = STATUS_FETCH_API + bankName;
			return jQuery.get(statusFetchingPath);
		}
	}]);

	return StatusFetchingService;
}();

var statusFetchingService = new StatusFetchingService();
var financialStateController = new FinancialStateController(statusFetchingService);
financialStateController.bindFetchingStatusForBank(jQuery('.bhp-get-status'), jQuery('.bhp-status-panel'), "BankHapoalim");
financialStateController.bindFetchingStatusForBank(jQuery('.dis-get-status'), jQuery('.dis-status-panel'), "BankDiscount");