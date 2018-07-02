//to require dotenv
require('dotenv').config();

console.log('keys.js is loaded');

module.exports = {
  google: {
    api_key: process.env.GOOGLE_API_KEY,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET
  },
  facebook: {
    id: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_APP_SECRET
  }
}