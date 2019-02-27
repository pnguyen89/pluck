require('dotenv').config();
const mysql = require('mysql');


const SENSITIVEDATA = {
  host: process.env.DBHOST,
  // user: 'root',
  user: process.env.DBUSERNAME,
  // password: '',
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
}; // the SENSITIVEDATA is git ignored. Remake locally for testing // replaced file with env variables

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ POSSIBLY USELESS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


const connection = mysql.createConnection({
  host: process.env.DBHOST,
  // user: 'root',
  user: process.env.DBUSERNAME,
  // password: '',
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

// DB HELPERS //
// all functions are named to explicitly state usage


// This is a good test to see if we are successfully connected to our database
module.exports.getAllPlants = (callback) => {
  connection.query('SELECT * FROM plants', (err, plants) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.getImageByGivenCategory = (category, callback) => {
  connection.query('SELECT image_url FROM categories WHERE category = ?', [category], (err, imageUrl) => {
    if (err) {
      callback(err);
    } else {
      callback(null, imageUrl);
    }
  });
}

module.exports.getPlantsByGivenZipcode = (zipcode, callback) => {
  connection.query('SELECT * FROM plants WHERE zipcode = ?', [zipcode], (err, plants) => {
    if (err) {
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.getPlantsByGivenUserId = (userId, callback) => {
  connection.query('SELECT * FROM plants WHERE id_user = ?', [userId], (err, plants) => {
    if (err) {
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.addFavorite = (userId, plantId, callback) => {
  connection.query('INSERT INTO favorites(id_user, id_plant) VALUES(?, ?)', [userId, plantId], (err, favorite) => {
    if (err) {
      callback(err);
    } else {
      callback(null, favorite);
    }
  });
};

module.exports.addUser = (username, pass, salt, zipcode, callback) => {
  connection.query('INSERT INTO users(username, hpass, salt, zipcode) VALUES(?, ?, ?, ?)', [username, salt + pass, salt, zipcode], (err, user) => {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  });
};

module.exports.getSaltByGivenUsername = (username, callback) => {
  connection.query('SELECT salt FROM users WHERE username = ?', [username], (err, salt) => {
    if (err) {
      callback(err);
    } else {
      callback(null, salt);
    }
  });
};

module.exports.addPlant = (userId, title, desc, address, zipcode, imageUrl, callback) => {
  connection.query('INSERT INTO plants(id_user, title, description, address, zipcode, image_url, status) VALUES(?, ?, ?, ?, ?, ?, "show")', [userId, title, desc, address, zipcode, imageUrl], (err, plant) => {
    if (err) {
      callback(err);
    } else {
      callback(null, plant);
    }
  });
};

module.exports.getUserIdByGivenUsername = (username, callback) => {
  connection.query('SELECT id FROM users WHERE username = ?', [username], (err, userId) => {
    if (err) {
      callback(err);
    } else {
      callback(null, userId);
    }
  });
};

module.exports.getUserByGivenUsername = (username, callback) => {
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  });
};



// TODO: login----getUser


// -------------------------------- TABLE LIST --------------------------------
//
// -- users
// -- | id(integer) | username(255 max) | hpass(255 max) | salt(255 max) |
//
//
// -- plants
// -- | id(integer) | id_user(integer) | title(255 max) | description(500 max) | address(255 max) | zipcode(integer) | image_url(255 max) | status('hide', 'show') |
//
//
// -- favorites
// -- | id(integer) | id_user(integer) | id_plant(integer) |
//
//
// -- categories
// -- | id(integer) | category(255 max) |
//
//
// -- plants_categories
// -- | id(integer) | id_plant(integer) | id_category(integer) |
//
// -------------------------------- END OF LIST --------------------------------