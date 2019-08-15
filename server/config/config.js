//================
// PORT
//================
process.env.PORT = process.env.PORT || 3000;


//================
// ENVIRONMENT
//================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//================
// DATA BASE
//================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffeedb';
} else {
    urlDB = 'mongodb+srv://admincoffee:I4a0qfR6AqbRgnnG@cluster0-qoiuv.mongodb.net/coffee';
}

process.env.URLDB = urlDB;