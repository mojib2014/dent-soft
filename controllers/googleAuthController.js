const keys = require("../config/keys");
// console.log("helo", keys.google.client_id);

const googleClientId = {
    googleId: (req, res) => {

        let google = {
            clientId: keys.google.client_id
        }
        
        res.json(google);
    }
}
    
module.exports = googleClientId;