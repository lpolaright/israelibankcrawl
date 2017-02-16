class BankHapoalimCrawler {
    constructor(banksConfig) {
        let bankHapoalimConfig = banksConfig['BankHapoalim'];
        this.password = bankHapoalimConfig['password'];
        this.username = bankHapoalimConfig['user'];
        this.money = {};

        this.phantomInstance = null;
        this.currentPage = null;
    }

	closePhantomInstance() {
		console.log('closing instance of phantom');
		if (this.phantomInstance) {
			this.phantomInstance.exit();
		}
	}

    createPage(phantomInstance) {
		console.log('creating page');
        this.phantomInstance = phantomInstance;
        return phantomInstance.createPage();
    }

    visitMainSite(page) {
		console.log('visiting main site');
        this.currentPage = page;
        return page.open('https://www.bankhapoalim.co.il/')
    }

    findLoginIframe(status) {
		console.log('finding login iframe');
        return this.currentPage.evaluate(function() {
            return jQuery('.clsLoginBox').find('iframe').attr('src');
        });
    }

    navigateToLogin(loginUrl) {
		console.log('navigating to the login page');
		this.currentPage.render('./BankHapoalimDebugging/main_page.png');
        return this.currentPage.open(loginUrl);
    }

    performLogin(status) {
		console.log('performing the login');
		this.currentPage.render('./BankHapoalimDebugging/login_page.png');
        return this.currentPage.evaluate(function(bankHapoalimConfig) {
            jQuery(document).ready(function () {
                arcot.initArcotIDClient('small');
                putFocusToFirstField();
                cancelAutoComplete();

                jQuery('#userID').val(bankHapoalimConfig[0]);
                jQuery('#userPassword').val(bankHapoalimConfig[1]);

                arcot.processSubmit();
                if (!arcot.cancelSubmit) { };
            });
        }, [this.username, this.password])
    }

    getMoneyStatus() {
		console.log('getting the money status');
		this.currentPage.render('./BankHapoalimDebugging/login_page_filled.png');
        return new Promise((resolveMonies, rejectMonies) => {
            setTimeout(() => {
                this.currentPage.evaluate(function() {
                    var mainSum = jQuery(jQuery('.mainSum')[0]).text();
                    var credit = jQuery(jQuery('.mainSum')[1]).text();

                    var returnedObject = {
                        "mainSum": mainSum,
                        "credit": credit
                    };

                    return returnedObject;
                }).then((moneyStatus) => {
                    this.currentPage.render('./BankHapoalimDebugging/last_page.png');
                    resolveMonies(moneyStatus);
                });
            }, 15000);
        });
    }
}

module.exports = BankHapoalimCrawler;