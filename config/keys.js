
console.log('this is loaded');

exports.google = {
  api_key: process.env.GOOGLE_API_KEY,
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET
};

exports.facebook = {
  id: process.env.FACEBOOK_APP_ID,
  secret: process.env.FACEBOOK_APP_SECRET
};