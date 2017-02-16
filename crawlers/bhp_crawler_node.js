let phantom = require('phantom');
let Promise = require('promise');

let banksConfig = require('../config/crawlersConfig.js')['banks'];

let bhpPromise = new Promise((resolve, reject) => {
    let monies = {};
    let sitepage = null;
    let phInstance = null;
    let _page = null;

    phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            var iframeLoginUrl = '';
            _page = page;
            return _page.open('https://www.bankhapoalim.co.il/')
        })
        .then(status => {
            return _page.evaluate(function () {
                return jQuery('.clsLoginBox').find('iframe').attr('src');
            });
        })
        .then(iframeLoginUrl => {
            return _page.open(iframeLoginUrl);
        })
        .then(status => {
            let bankConfig = banksConfig['BankHapoalim'];
            return _page.evaluate(function (bankConfig) {
                jQuery(document).ready(function () {
                    arcot.initArcotIDClient('small');
                    putFocusToFirstField();
                    cancelAutoComplete();

                    jQuery('#userID').val(bankConfig['user']);
                    jQuery('#userPassword').val(bankConfig['password']);

                    arcot.processSubmit();
                    if (!arcot.cancelSubmit) { };
                });
            }, bankConfig)
        })
        .then(() => {
            return new Promise(function (resolveMonies, rejectMonies) {
                setTimeout(function () {
                    console.log("evaluating the page");

                    _page.evaluate(function () {

                        var mainSum = jQuery(jQuery('.mainSum')[0]).text();
                        var credit = jQuery(jQuery('.mainSum')[1]).text();

                        var returnedObject = {
                            "mainSum": mainSum,
                            "credit": credit
                        };

                        return returnedObject;
                    }).then(myMonies => {
                        _page.render('bhp_page.png');
                        resolveMonies(myMonies);
                    });
                }, 15000);
            });
        })
        .then(monies => {
            console.log("got the monies: ");
            console.log(monies);
            resolve(monies);

            phInstance.exit();
        })
        .catch(error => {
            console.log(error);
            reject(error);
            phInstance.exit();
        });
});


module.exports = bhpPromise;