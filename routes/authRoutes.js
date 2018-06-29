const passport = require('passport');
module.exports =  (app) => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"]
        })
    );
    app.get('/auth/google/callback', passport.authenticate('google'));

}

// 作者：妖僧风月
// 链接：https://juejin.im/post/5a002c09f265da431955ab49
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。