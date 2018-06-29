require("dotenv").config();
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

passport.use(
    new GoogleStrategy(
        {
            clientID: "581039946042-esa7akgitusf5atfeod11j2p07oft4ml.apps.googleusercontent.com",
            clientSecret: "Se-7CvuJOO-JYKuPUNozW3yg",
            callbackURL: "/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile);
            console.log('done', done);
        }
    )
);
