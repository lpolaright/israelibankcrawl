export class ConfigController {
	constructor(configurationUpdatingService) {
		this.configurationUpdatingService = configurationUpdatingService;	
	}

	bindSubmitButton($form) {
		$form.on('submit', (event) => {
			event.preventDefault();
			let bankConfigParams = $form.serialize();
			this.configurationUpdatingService.addNewBankConfig(bankConfigParams)
				.then((data) => {
					console.log(data);
					jQuery('#add-bank-config-dialog').modal('hide');
				})
				.catch((error) => {
					console.log(error);
					jQuery('#add-bank-config-dialog').modal('hide');
				});
			return false;
		});
	}
}