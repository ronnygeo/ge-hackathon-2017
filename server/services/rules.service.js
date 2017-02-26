/**
 * Created by ronnygeo on 2/25/17.
 */
module.exports = function (app, q, rulesModel) {
    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    app.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to rules api!' });
    });
    app.post('/rules/country', checkCountryRules);
    app.post('/rules/send', checkSendRules);
    app.post('/rules/tool-conditions', checkToolConditions);

    function checkCountryRules(req, res) {
        let data = req.body;
        // console.log(data);
        rulesModel.checkCountryRules(data).then(function (data) {
            console.log(data);
            return res.json(data);
            },
            function (err) {
                return res.status(400).send(err);
            });
    }

    function checkSendRules(req, res) {
        let data = req.body;
        console.log(data);
        rulesModel.checkSendRules(data).then(function (data) {
                console.log(data);
                return res.json(data);
            },
            function (err) {
                return res.status(400).send(err);
            });
    }


    function checkToolConditions(req, res) {
        let data = req.body;
        rulesModel.checkToolConditions(data).then(function (data) {
                console.log(data);
                return res.send(data);
            },
            function (err) {
                return res.status(400).send(err);
            });
    }
};
