/**
 * Created by ronnygeo on 2/25/17.
 */
module.exports = function (q) {
    // let Engine = require('json-rules-engine');

    let rulesDataCountry = require("./rules.country.data.json");
    let rulesDataTools = require("./rules.tools.data.json");
    let rulesCountry = require("./rules.country.json");
    let rulesTools = require("./rules.tools.json");

    //Initialize engine 1 for country check
    // let engine1 = Engine;


    //initialize engine 2 for tool usability check
    // let engine2 = Engine;
    // engine2.addRule(rulesTools);

    //API to access the functions
    return {
        checkCountryRules: checkCountryRules,
        checkToolRules: checkToolRules,
        checkSendRules: checkSendRules
    };

    function checkCountryRules(fact) {
        let deferred = q.defer();
        for (let c in rulesDataCountry) {
            // console.log(rulesDataCountry[c].source == fact.source);
            if (rulesDataCountry[c].source == fact.source && rulesDataCountry[c].destinations.indexOf(fact.destination) != -1) {
                // console.log("got "+fact.source+" and "+fact.destination);
                deferred.resolve({"status": true});
            }
            else {
                deferred.reject("Compliance does not allow you to send the file to this destination.");
            }
        }
        return deferred.promise;
    }

    function checkSendRules(fact) {
        let deferred = q.defer();
        console.log(fact);
        if (fact.user.status != "LR") {
            deferred.reject("Compliance Mismatch: you do not have the necessary clearance.");
        } else {
            for (let c in rulesDataCountry) {
                // console.log(rulesDataCountry[c].source == fact.source);
                if (rulesDataCountry[c].source == fact.source && rulesDataCountry[c].destinations.indexOf(fact.destination) != -1) {
                    // console.log("got "+fact.source+" and "+fact.destination);
                    deferred.resolve({"status": true});
                }
                else {
                    deferred.reject("Compliance does not allow you to send the file to this destination.");
                }
            }
        }
        return deferred.promise;
    }

    function checkToolRules(fact) {
        let deferred = q.defer();


        return deferred.promise;
    }

    function checkCountryRulesEngine(fact) {
        // let s = fact.source;
        // let d = rulesDataCountry[s];
        // let rule = new Rule(options);
        //
        // engine1.addRule({
        //     conditions: {
        //         all: [
        //             //     {
        //             //     fact: 'source',
        //             //     operator: 'equal',
        //             //     value: rulesDataCountry.keys()
        //             // },
        //             {
        //                 fact: 'destination',
        //                 operator: 'in',
        //                 value: d
        //             }]
        //     },
        //     event: {  // define the event to fire when the conditions evaluate truthy
        //         type: 'confirmed',
        //         params: {
        //             message: 'File will be sent.'
        //         }
        //     }
        // });
        //
        // // engine1.addFact(fact);
        // // engine1.on('success', function (event, engine) {
        // //     deferred.resolve(event);
        // // });
        // // engine1.on('failure', function (event, engine) {
        // //     deferred.reject("Compliance does not allow you to send the file to this destination.");
        // // })
        // engine1
        //     .run(facts)
        //     .then(events => { // run() return events with truthy conditions
        //         events.map(event => deferred.resolve(event))
        //     })
        //     .catch(function () {
        //         deferred.reject("Compliance does not allow you to send the file to this destination.");
        //     });
        //
        //

    }

}