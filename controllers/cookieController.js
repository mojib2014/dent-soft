var cookieSession = require('cookie-session')

module.exports = {
    setCookie: (req, res, next) => {
        // console.log("cookieController", req.body);
        req.session = req.body
        res.json(req.body);
    }
}