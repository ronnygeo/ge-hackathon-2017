/**
 * Created by ronnygeo on 2/25/17.
 */
module.exports = function (app, q, rulesModel) {
    app.get('/rules/country', checkCountryRules);
    app.get('/rules/tool-conditions', checkToolConditions);

    function checkCountryRules(req, res) {
        let data = req.body;
        rulesModel.checkCountryRules(data).then(function (res) {
                res.json(res);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function checkToolConditions(req, res) {

    }
};