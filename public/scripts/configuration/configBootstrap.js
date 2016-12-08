import {ConfigController} from "configuration/configController";

let configController = new ConfigController();
configController.bindSubmitButton(jQuery('.bank-config-form'));