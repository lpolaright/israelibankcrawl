let phantom = require('phantom');
let Promise = require('promise');
let banksConfig = require('../config/crawlersConfig.js')['banks'];

let discountPromise = new Promise((resolve, reject) => {
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
            return _page.open('https://www.discountbank.co.il/DB/private')
        })
        .then(status => {
            return _page.evaluate(function () {
                return jQuery('#hpc-login-box').find('iframe').attr('src');
            });
        })
        .then(iframeLoginUrl => {
            return _page.open(iframeLoginUrl);
        })
        .then(status => {
            console.log("evaluating the login page");
            _page.render('discount_1_page.png');
            let bankConfig = banksConfig['BankDiscount'];
            return _page.evaluate(function (bankConfig) {
                jQuery(document).ready(function () {
                    jQuery('#tzId').val(bankConfig['id']);
                    jQuery('#tzPassword').val(bankConfig['password']);
                    jQuery('#aidnum').val(bankConfig['aid']);

                    jQuery('#submitButton').click();
                });
            }, bankConfig)
        })
        .then(() => {
            return new Promise(function (resolveMonies, rejectMonies) {
                setTimeout(function () {
                    console.log("evaluating the page");
                    _page.render('discount_2_page.png');
                    _page.evaluate(function () {

                        var mainSum = jQuery('#phpIFrame').contents().find('#accountbalance_limit').text().replace(/ |₪|\n/g,'');
                        var credit = jQuery('#phpIFrame').contents().find('#cardCurrencyDebit').text().replace(/ |₪|\n/g,'');

                        var returnedObject = {
                            "mainSum": mainSum,
                            "credit": credit
                        };

                        return returnedObject;
                    }).then(myMonies => {
                        console.log("got the straight from the source monies: ");
                        console.log(myMonies);
                        _page.render('discount_page.png');
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


module.exports = discountPromise;