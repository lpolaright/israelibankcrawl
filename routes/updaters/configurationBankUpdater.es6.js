module.exports = class ConfigurationBankUpdater {
	update(request, response, next) {
		response.status(200).json({"message": "Success"});
	}
}