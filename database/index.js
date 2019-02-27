const mysql = require('mysql');
require('dotenv').config();
const _ = require('lodash');

// the SENSITIVEDATA is git ignored. Remake locally for testing // replaced file with env variables

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ POSSIBLY USELESS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


const connection = mysql.createConnection({
  host: process.env.DBHOST,
  // user: 'root',
  user: process.env.DBUSERNAME,
  // password: '',
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

connection.connect((err) => {
  if (err) {
    console.log('There Was A Problem Connecting To The DB');
  } else {
    console.log('DB Connection Established');
  }
});

module.exports.connection = connection;

// DB HELPERS //
// all functions are named to explicitly state usage


// This is a good test to see if we are successfully connected to our database


module.exports.getImageByGivenCategory = (category, callback) => {
  connection.query('SELECT image_url FROM categories WHERE category = ?', [category], (err, imageUrl) => {
    if (err) {
      callback(err);
    } else {
      callback(null, imageUrl);
    }
  });
};

module.exports.getPlantsByGivenZipcode = (zipcode, callback) => {
  connection.query('SELECT * FROM plants WHERE zipcode = ?', [zipcode], (err, plants) => {
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

module.exports.selectAllPlants = (callback) => {
  connection.query('SELECT * FROM plants', (err, plants) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.insertPlant = (plant, address, zipcode, iduser, callback) => {
  const q = [plant, address, zipcode];
  connection.query('INSERT INTO plants (plant, address, zipcode) VALUES (?, ?, ?)', q, (err) => {
    if (err) {
      callback(err, null);
    } else {
      module.exports.selectAllPlants((err2, oldPlants) => {
        if (err2) {
          callback(err2, null);
        } else {
          const mostRecent = oldPlants[oldPlants.length - 1];
          module.exports.insertUserPlant(iduser, mostRecent.id, (err3, userPlant) => {
            if (err3) {
              callback(err3, null);
            } else {
              callback(null, userPlant);
            }
          });
        }
      });
    }
  });
};

module.exports.insertUserPlant = (iduser, idplant, callback) => {
  const q = [iduser, idplant];
  connection.query('INSERT INTO usersPlants (iduser, idplant) VALUES (?, ?)', q, (err) => {
    if (err) {
      callback(err, null);
    } else {
      module.exports.selectAllOfAUsersPlants(iduser, (err2, plants) => {
        if (err2) {
          callback(err2, null);
        } else {
          callback(null, plants[plants.length - 1]);
        }
      });
    }
  });
};

module.exports.selectAllOfAUsersPlants = (iduser, callback) => {
  connection.query(`SELECT * FROM usersPlants WHERE iduser = ${iduser}`, (err, plants) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.insertPlantData = (planttype, imagelink, callback) => {
  const q = [planttype, imagelink];
  connection.query('SELECT * FROM plantData', (err, oldPlants) => {
    if (err) {
      callback(err, null);
    } else {
      const plants = _.map(oldPlants, (oldPlant) => {
        return oldPlant['planttype'];
      });
      if (!_.includes(plants, planttype)) {
        connection.query('INSERT INTO plantData (planttype, imagelink) VALUES (?, ?)', q, (err2) => {
          if (err2) {
            callback(err2, null);
          } else {
            connection.query(`SELECT * FROM plantData WHERE planttype = '${planttype}'`, (err3, plant) => {
              if (err3) {
                callback(err3, null);
              } else {
                callback(null, plant);
              }
            });
          }
        });
      } else {
        callback(null, 'Already Exists');
      }
    }
  });
};

module.exports.selectAllPlantData = (callback) => {
  connection.query('SELECT * FROM plantData', (err, plants) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.selectPlantImage = (planttype, callback) => {
  connection.query(`SELECT * FROM plantData WHERE planttype = '${planttype}'`, (err, singlePlantArray) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, singlePlantArray[0].imagelink);
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

