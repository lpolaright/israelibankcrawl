'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigController = function () {
	function ConfigController(configurationUpdatingService) {
		_classCallCheck(this, ConfigController);

		this.configurationUpdatingService = configurationUpdatingService;
	}

	_createClass(ConfigController, [{
		key: 'bindSubmitButton',
		value: function bindSubmitButton($form) {
			var _this = this;

			$form.on('submit', function (event) {
				event.preventDefault();
				var bankConfigParams = $form.serialize();
				_this.configurationUpdatingService.addNewBankConfig(bankConfigParams).then(function (data) {
					console.log(data);
					jQuery('#add-bank-config-dialog').modal('hide');
				}).catch(function (error) {
					console.log(error);
					jQuery('#add-bank-config-dialog').modal('hide');
				});
				return false;
			});
		}
	}]);

	return ConfigController;
}();

var ADD_NEW_BANK_CONFIG_API_URL = '/configuration/bank';

var ConfigurationUpdatingService = function () {
	function ConfigurationUpdatingService() {
		_classCallCheck(this, ConfigurationUpdatingService);
	}

	_createClass(ConfigurationUpdatingService, [{
		key: 'addNewBankConfig',

		/**
   * @param {string} bankName
   * @return {Promise}
   */
		value: function addNewBankConfig(bankConfigParams) {
			return jQuery.post(ADD_NEW_BANK_CONFIG_API_URL, bankConfigParams);
		}
	}]);

	return ConfigurationUpdatingService;
}();

var configurationUpdatingService = new ConfigurationUpdatingService();
var configController = new ConfigController(configurationUpdatingService);
configController.bindSubmitButton(jQuery('.bank-config-form'));