let phantom = require('phantom');
let Promise = require('promise');

let crawlerConfig = require('../config/crawlersConfig.js');
let BankHapoalimCrawler = require('./BankHapoalimCrawler');

let bhpPromise = new Promise((resolve, reject) => {
    let banksConfig = crawlerConfig['banks'];
    let bankHapoalimCrawler = new BankHapoalimCrawler(banksConfig);

    phantom.create()
        .then(bankHapoalimCrawler.createPage.bind(bankHapoalimCrawler))
        .then(bankHapoalimCrawler.visitMainSite.bind(bankHapoalimCrawler))
        .then(bankHapoalimCrawler.findLoginIframe.bind(bankHapoalimCrawler))
        .then(bankHapoalimCrawler.navigateToLogin.bind(bankHapoalimCrawler))
        .then(bankHapoalimCrawler.performLogin.bind(bankHapoalimCrawler))
        .then(bankHapoalimCrawler.getMoneyStatus.bind(bankHapoalimCrawler))
        .then(moneyStatus => {
            resolve(moneyStatus);
            bankHapoalimCrawler.closePhantomInstance();
        })
        .catch(error => {
            console.log(error);
            reject(error);
            bankHapoalimCrawler.closePhantomInstance();
        });
});


module.exports = bhpPromise;