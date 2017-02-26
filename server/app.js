// /**
//  * Created by ronnygeo on 2/25/17.
//  */
module.exports = function (app) {
    let q = require('q');
    let rulesModel = require("./model/rules.model.js")(q);
    require("./services/rules.service.js")(app, q, rulesModel);
};