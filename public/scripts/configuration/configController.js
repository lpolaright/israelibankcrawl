export class ConfigController {
	bindSubmitButton($form) {
		$form.on('submit', (event) => {
			event.preventDefault();
			let bankConfigParams = $form.serialize();		
			return false;
		});
	}
}