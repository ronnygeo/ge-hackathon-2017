/**
 * Created by sumeetdubey on 2/25/17.
 */
module.exports = function(app){
    var mock=['sumeet', 'ronny'];
    var api = {
        authenticate: authenticate
    };
    return api;

    function authenticate(username){
        console.log('here');
        for(var i=0;i<mock.length; i++){
            if(String(username) === String(mock[i])){
                return true
            }
        }
        return false
    }
};