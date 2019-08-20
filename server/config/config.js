//================
// PORT
//================
process.env.PORT = process.env.PORT || 3000;


//================
// ENVIRONMENT
//================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================
// EXPIRATION TOKEN
//================
// 60 seconds
// 60 min
// 24 hours
// 30 days
process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 30;

//================
// SEED AUTHENTICATION
//================
process.env.SEED = process.env.SEED || 'seed-dev';

//================
// DATA BASE
//================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffeedb';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//======================
// CLIENT_ID
//======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '150056106435-8j1ds5do2qb5qu21b0a1306g3n2sdgvl.apps.googleusercontent.com';