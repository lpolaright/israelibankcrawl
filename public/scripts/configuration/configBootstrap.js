import {ConfigController} from "configuration/configController";
import {ConfigurationUpdatingService} from "services/configurationUpdatingService";

let configurationUpdatingService = new ConfigurationUpdatingService();
let configController = new ConfigController(configurationUpdatingService);
configController.bindSubmitButton(jQuery('.bank-config-form'));