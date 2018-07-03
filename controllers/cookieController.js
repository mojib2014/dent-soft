var cookieSession = require('cookie-session')

module.exports = {
    setCookie: (req, res, next) => {
        // console.log("cookieController", req.body);
        req.session.id = req.body
        res.end("cookie added")
    },
    getCookie: (req, res, next) => {
        console.log(req.session)
        res.end(req.session.id);
    }
}