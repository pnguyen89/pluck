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

// add a plant to the database and assign the plant to a specific user //
module.exports.insertPlant = (plant, address, zipcode, iduser, callback) => {
  // assign insertion properties
  const q = [plant, address, zipcode];
  // insert into databases
  connection.query('INSERT INTO plants (plant, address, zipcode) VALUES (?, ?, ?)', q, (err) => {
    if (err) {
      callback(err, null);
    } else {
      // get all current plants
      module.exports.selectAllPlants((err2, oldPlants) => {
        if (err2) {
          callback(err2, null);
        } else {
          // get the plant that we just added
          const mostRecent = oldPlants[oldPlants.length - 1];
          // assign that plant to a user
          module.exports.insertUserPlant(iduser, mostRecent.id, (err3, userPlant) => {
            if (err3) {
              callback(err3, null);
            } else {
              // return the new table data row
              callback(null, userPlant);
            }
          });
        }
      });
    }
  });
};

// module.exports.insertPlant('Apples', '1725 Delachaise St., Apt#108, New Orleans, LA', 70115, 1, (err, res) => {
//   return err;
// });

module.exports.insertUserPlant = (iduser, idplant, callback) => {
  // assign the insertion values
  const q = [iduser, idplant];
  // insert to the database
  connection.query('INSERT INTO usersPlants (iduser, idplant) VALUES (?, ?)', q, (err) => {
    if (err) {
      callback(err, null);
    } else {
      // get all plants assigned to users
      module.exports.selectAllUsersPlants(iduser, (err2, plants) => {
        if (err2) {
          callback(err2, null);
        } else {
          // send back the newest plant assigned to a user
          callback(null, plants[plants.length - 1]);
        }
      });
    }
  });
};

module.exports.selectSinglePlant = (idplant, callback) => {
  // get a single plant through its id
  connection.query(`SELECT * FROM plants WHERE id = ${idplant}`, (err, singlePlantArray) => {
    if (err) {
      callback(err, null);
    } else {
      // send back the plant
      callback(null, singlePlantArray[0]);
    }
  });
};

module.exports.updatePlantLikes = (idplant, bool, callback) => {
  if (bool === true) {
    // if bool is true add like
    // get the plant with the input id
    module.exports.selectSinglePlant(idplant, (err, plant) => {
      if (err) {
        callback(err, null);
      } else {
        // update the plants likes
        connection.query(`UPDATE plants SET likes = ${plant.likes + 1} WHERE id = ${idplant}`, (err2) => {
          if (err2) {
            callback(err2, null);
          } else {
            // get the plant with the updated value
            module.exports.selectSinglePlant(idplant, (err3, updatedPlant) => {
              if (err3) {
                callback(err3, null);
              } else {
                // send back the plant
                callback(null, updatedPlant);
              }
            });
          }
        });
      }
    });
  } else if (bool === false) {
    // if bool is true add like
    // get the plant with the input id
    module.exports.selectSinglePlant(idplant, (err, plant) => {
      if (err) {
        callback(err, null);
      } else {
        // update the plants likes
        connection.query(`UPDATE plants SET likes = ${plant.likes - 1} WHERE id = ${idplant}`, (err2) => {
          if (err2) {
            callback(err2, null);
          } else {
            // get the plants with the updated likes
            module.exports.selectSinglePlant(idplant, (err3, updatedPlant) => {
              if (err3) {
                callback(err3, null);
              } else {
                // send back the plants
                callback(null, updatedPlant);
              }
            });
          }
        });
      }
    });
  } else {
    // edge case
    callback(Error("Incorrect 'bool' value!"), null);
  }
};

// module.exports.updatePlantLikes(1, true, (err, res) => {
//   console.log(err, res);
// });

module.exports.selectAllZipcodePlants = (zipcode, callback) => {
  // get all plants in a specific zip code
  connection.query(`SELECT * FROM plants WHERE zipcode = ${zipcode}`, (err, plants) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, plants);
    }
  });
};

// module.exports.selectAllZipcodePlants(70115, (err, res) => {
//   console.log(err, res);
// });

module.exports.selectAllUsersPlants = (iduser, callback) => {
  // get plant ids based on the user
  connection.query(`SELECT * FROM usersPlants WHERE iduser = ${iduser}`, (err, combos) => {
    if (err) {
      callback(err, null);
    } else {
      // get an array of plant ids
      const plantIds = _.map(combos, (combo) => {
        return combo.idplant;
      });
      // array for holding the plants that we are going to return
      const returnPlants = [];
      _.forEach(plantIds, (id, index) => {
        // get a single plant
        module.exports.selectSinglePlant(id, (err2, plant) => {
          if (err2) {
            callback(err2, null);
          } else {
            // add the plant to the return array
            returnPlants.push(plant);
            if (index === plantIds.length - 1) {
              // send back the plants array
              callback(null, returnPlants);
            }
          }
        });
      });
    }
  });
};

// module.exports.selectAllUsersPlants(1, (err, res) => {
//   console.log(err, res);
// });

module.exports.selectAllUsersLikes = (iduser, callback) => {
  // get all likes that are assigned to a specific user id
  connection.query(`SELECT * FROM usersLiked WHERE iduser = ${iduser}`, (err, ids) => {
    // get all of the plant ids
    const plantIds = _.map(ids, (combo) => {
      return combo.idplant;
    });
    // array to return that will hold plant objects
    const returnPlants = [];
    if (plantIds.length === 0) {
    // if no likes return empty array
      callback(null, []);
    } else {
      _.forEach(plantIds, (id, index) => {
        // get a single plants data
        module.exports.selectSinglePlant(id, (err, plant) => {
          if (err) {
            callback(err, null);
          } else {
            // push the plants object of data to the array
            returnPlants.push(plant);
            if (index === plantIds.length - 1) {
              // send back the array
              callback(null, returnPlants);
            }
          }
        });
      });
    }
  });
};

module.exports.insertPlantData = (planttype, imagelink, callback) => {
  const q = [planttype, imagelink];
  // get all current plant data
  connection.query('SELECT * FROM plantData', (err, oldPlants) => {
    if (err) {
      callback(err, null);
    } else {
      // get all plant names
      const plants = _.map(oldPlants, (oldPlant) => {
        return oldPlant['planttype'];
      });
      if (!_.includes(plants, planttype)) {
        // if plant doesn't exist, add to db
        connection.query('INSERT INTO plantData (planttype, imagelink) VALUES (?, ?)', q, (err2) => {
          if (err2) {
            callback(err2, null);
          } else {
            // get the newly added plant
            connection.query(`SELECT * FROM plantData WHERE planttype = '${planttype}'`, (err3, plant) => {
              if (err3) {
                callback(err3, null);
              } else {
                // send back plant
                callback(null, plant);
              }
            });
          }
        });
      } else {
        // if plant already exists, say so
        callback(null, 'Already Exists');
      }
    }
  });
};

module.exports.selectAllPlantData = (callback) => {
  // get all plants
  connection.query('SELECT * FROM plantData', (err, plants) => {
    if (err) {
      callback(err, null);
    } else {
      //send all plants in array
      callback(null, plants);
    }
  });
};

module.exports.selectPlantImage = (planttype, callback) => {
  // select a plant based in its id
  connection.query(`SELECT * FROM plantData WHERE planttype = '${planttype}'`, (err, singlePlantArray) => {
    if (err) {
      callback(err, null);
    } else {
      // send back the plants image
      callback(null, singlePlantArray[0].imagelink);
    }
  });
};

module.exports.updateUserLikedPlant = (iduser, idplant, callback) => {
  const q = [iduser, idplant];
  // get all of a specific users liked plants
  module.exports.selectAllUsersLikes(iduser, (err, likes) => {
    if (err) {
      callback(err, null);
    } else if (likes.length === 0) {
      // if there are no like for the user add a like
      // add a like to the db for said user
      connection.query('INSERT INTO usersLiked (iduser, idplant) VALUES (?, ?)', q, (err2) => {
        if (err2) {
          callback(err, null);
        } else {
          // update the specific plants amount of likes
          module.exports.updatePlantLikes(idplant, true, (err3, updatedPlant) => {
            if (err3) {
              callback(err, null);
            } else {
              // send back the updated plant
              callback(null, updatedPlant);
            }
          });
        }
      });
    } else {
      // if the user does have likes
      // get the ids of the plants that the user likes
      const plantIds = _.map(likes, (plant) => {
        return plant.id;
      });
      // check if the user has already liked the plant
      if (!_.includes(plantIds, idplant)) {
        // if they haven't then add the like
        connection.query('INSERT INTO usersLiked (iduser, idplant) VALUES (?, ?)', q, (err2) => {
          if (err2) {
            callback(err, null);
          } else {
            // update the like counter for the plant
            module.exports.updatePlantLikes(idplant, true, (err3, updatedPlant) => {
              if (err3) {
                callback(err3, null);
              } else {
                // send back the updated plant data
                callback(null, updatedPlant);
              }
            });
          }
        });
      } else {
        // if they already have liked the plant, assume that they don't like it anymore and delete it from their likes
        connection.query(`DELETE FROM usersLiked WHERE iduser = ${iduser} AND idplant = ${idplant}`, (err4, res) => {
          if (err4) {
            callback(err4, null);
          } else {
            // update the plant likes counter
            module.exports.updatePlantLikes(idplant, false, (err5) => {
              if (err5) {
                callback(err5, null);
              } else {
                // get all of the users likes
                module.exports.selectAllUsersLikes(iduser, (err6, updatedLikes) => {
                  if (err6) {
                    callback(err6, null);
                  } else {
                    // send the likes back to the user
                    callback(null, updatedLikes);
                  }
                });
              }
            });
          }
        });
      }
    }
  });
};
