require('dotenv').config();
require('../NewFAndV');
const express = require('express');
const bodyParser = require('body-parser');
const dbHelpers = require('../database/index.js');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/allplants', (req, res) => {
  // select all plants in database
  dbHelpers.selectAllPlants((err, plants) => {
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT RETRIEVE PLANTS');
    } else {
      // send back all plants
      res.status(200).send(plants);
    }
  });
});

// SERVER ROUTES
// They seem to be working as intended through postman requests. The post routes may need to change from req.body to req.query. Im not sure


app.get('/user/profile', (req, res) => {
  // get user by username
  dbHelpers.selectUsersByUsername(req.query.username, (err, user) => {
    if (err) {
      res.status(500).send('UNABLE TO RETEIVE USER THROUGH USERNAME');
    } else {
      // get user's plants
      dbHelpers.selectAllUsersPlants(user.id, (err2, plants) => {
        if (err2) {
          res.status(500).send('UNABLE TO RETRIEVE THE USERS PLANTS');
        } else {
          // send back user's plants
          res.status(200).send(plants);
        }
      });
    }
  });
});

app.post('/plant/user', (req, res) => {
  // request body needs a username, planttype/currency, address, zipcode, and a description (not in this particular order)
  // get user by username
  dbHelpers.selectUsersByUsername(req.body.username, (err, user) => {
    if (err) {
      res.status(500).send('COULD NOT RETRIEVE USER FROM DATABASE');
    } else {
      // add new plant to the database
      // currency stands for the type of plant
      dbHelpers.insertPlant(user.id, req.body.currency, req.body.address, parseInt(req.body.zipcode), req.body.description, (err2, data) => {
        if (err2) {
          res.status(500).send('Something went wrong while saving plant to the database');
        } else {
          // send back the newly created plant
          res.status(204).send(data);
        }
      });
    }
  });
  // req.query, req.body, req.params i dont know what to use. query works for now though // userId, address, zipcode
});

// app.get('/health', (req, res) => {
//   dbHelpers.getAllPlants((err, plants) => { // change function name to test each db helpers
//     if (err) {
//       console.log(err);
//       res.send('weiner');
//     } else {
//       console.log(plants);
//       res.send('notQuiteWeiner');
//     }
//   });
// });

// function to catch get req from client login
// app.get('/user/login', (req, res) => {
//   console.log(req.query);
//   dbHelpers.getUserByGivenUsername(req.query.username, (err, user) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('INCORRECT USERNAME/PASSWORD/MAYBE ITS OUR SERVER/DB FAULT');
//     } else if (user[0].salt + req.query.password === user[0].hpass) {
//     // } else if (user.username === req.query.username) { // testing
//       dbHelpers.getPlantsByGivenUserId(user[0].id, (err, plants) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send('COULD NOT RETRIEVE USER PLANTS');
//         } else {
//           res.status(200).send({ id: user[0].id, username: user[0].username, zipcode: user[0].zipcode, plants });
//         }
//       }); // return whole user obj and not just username
//     } else {
//       res.status(400).send('INCORRECT USERNAME/PASSWORD');
//     }
//   });
//   // figure out what to pass down to helper function
//   // call helper function from database
//   // .then() grab data returned from helper function
//   //    res.send(data) back to the client with status
//   // catch errors
// });

app.put('/user/login', (req, res) => {
  // see if username and password are valid
  dbHelpers.verifyUser(req.body.username, req.body.password, (err, user) => {
    if (err) {
      res.status(500).send('Invalid Username or Password');
    } else {
      // send back the user's data
      res.status(202).send(user);
    }
  });
});

// app.get('/plant/category', (req, res) => {
//   dbHelpers.getImageByGivenCategory(req.query.category, (err, imageUrl) => {
//     console.log(req.query.category)
//     if (err) {
//       console.log(err);
//       res.status(500).send('COULD NOT RETRIEVE IMAGE');
//     } else {
//       res.status(200).send(imageUrl);
//       // console.log();
//     }
//   });
// });

// function to catch get req from client zipcode view
app.get('/zipcode', (req, res) => {
  console.log(req.query);
  dbHelpers.selectAllZipcodePlants(parseInt(req.body.zipcode), (err, plants) => {
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT RETRIEVE NEARBY PLANTS');
    } else {
      res.status(200).send(plants);
    }
  });
  // call helper function from database
  // .then() grab data returned from helper function
  //    res.send data and status
  // catch errors
});

// function to catch post from client signup work
app.post('/user/info', (req, res) => {
  console.log(req.body);
  const { username, password, zipcode } = req.body;
  dbHelpers.addUser(username, password, 'a', zipcode, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT CREATE PROFILE');
    } else {
      res.status(203).send('PROFILE CREATED');
    }
  });
  // call helper function from db that saves user instance to db
});

// function to catch get from client plant list view
//   get req to api for directions to plant
//   should send location/address of plant

const port = process.env.PORT || 3001;

// Listen and console log current port //
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

module.exports.app = app;
module.exports.port = port;
