var express = require('express');
var router = express.Router();
var RoutesAutoLoader = require('../routes/autoLoaders/routesAutoLoader.es6');

var FinancialState = require('../models/financialState');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/financial-state', function (req, res, next) {
  FinancialState.findOne({ 'owner': 'all' }, function (err, financialState) {
    if (err) next(err);
    if (!financialState) {
      financialStateDetails = {
        owner: 'all',
        dailyStatus: [],
        income: []
      }
      var financialState = new FinancialState(financialStateDetails);
      financialState.save(function (err) {
        if (err) next(err);
        console.log("Created a new financial state");
        res.render('financial_state', { title: 'Financial State', financialState: financialState });
      });
    } else {
      console.log("Showing an existing financial state");
      res.render('financial_state', { title: 'Financial State', financialState: financialState });
    }
  });
});

router.post('/income', function (req, res, next) {
  FinancialState.findOne({ 'owner': 'all' }, function (err, financialState) {
    if (err) next(err);
    if (financialState) {
      financialState.income.push(req.body);
      financialState.save(function (err) {
        if (err) res.status(500).json(err);
        res.status(200).json(financialState);
      });
    }
  });
});

var routesAutoLoader = new RoutesAutoLoader(router);
console.log(routesAutoLoader.getRoutePathContoller('/financial-state/today/:bank_name'));
routesAutoLoader.configureRoutes();
router = routesAutoLoader.router;

module.exports = router;
