require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const dbHelpers = require('../database/index.js');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  dbHelpers.getAllPlants((err, plants) => { // change this function name to test other db helpers
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT RETRIEVE PLANTS');
    } else {
      res.status(200).send(plants);
    }
  });
});

// SERVER ROUTES
// They seem to be working as intended through postman requests. The post routes may need to change from req.body to req.query. Im not sure


app.get('/user/profile', (req, res) => {
  dbHelpers.getUserIdByGivenUsername(req.query.username, (err, userId) => {
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT RETRIEVE ID_USER');
    } else {
      dbHelpers.getPlantsByGivenUserId(userId, (err, plants) => {
        if (err) {
          console.log(err);
          res.status(500).send('COULD NOT RETRIEVE PLANTS');
        } else {
          res.status(200).send(plants);
        }
      });
    }
  });
});

app.post('/plant/profile', (req, res) => {
  dbHelpers.getUserByGivenUsername(req.body.username, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT RETRIEVE USER FROM DATABASE');
    } else {
      dbHelpers.addPlant(user[0].id, req.body.currency, req.body.description, '38318 kanks place drive', user[0].zipcode, 'https://inhabitat.com/wp-content/blogs.dir/1/files/2013/05/tomatoes-vine.jpg', (err, plant) => {
        if (err) {
          console.log(err);
          res.status(500).send('COULD NOT CREATE PLANT PROFILE');
        } else {
          res.status(203).send('PLANT PROFILE CREATED');
        }
      });
    }
  });
  // req.query, req.body, req.params i dont know what to use. query works for now though // userId, address, zipcode
});

app.get('/health', (req, res) => {
  dbHelpers.getAllPlants((err, plants) => { // change function name to test each db helpers
    if (err) {
      console.log(err);
      res.send('weiner');
    } else {
      console.log(plants);
      res.send('notQuiteWeiner');
    }
  });
});

// function to catch get req from client login
app.get('/user/login', (req, res) => {
  console.log(req.query);
  dbHelpers.getUserByGivenUsername(req.query.username, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send('INCORRECT USERNAME/PASSWORD/MAYBE ITS OUR SERVER/DB FAULT');
    } else if (user[0].salt + req.query.password === user[0].hpass) {
    // } else if (user.username === req.query.username) { // testing
      dbHelpers.getPlantsByGivenUserId(user[0].id, (err, plants) => {
        if (err) {
          console.log(err);
          res.status(500).send('COULD NOT RETRIEVE USER PLANTS');
        } else {
          res.status(200).send({ id: user[0].id, username: user[0].username, zipcode: user[0].zipcode, plants });
        }
      }); // return whole user obj and not just username
    } else {
      res.status(400).send('INCORRECT USERNAME/PASSWORD');
    }
  });
  // figure out what to pass down to helper function
  // call helper function from database
  // .then() grab data returned from helper function
  //    res.send(data) back to the client with status
  // catch errors
});

app.get('/plant/category', (req, res) => {
  dbHelpers.getImageByGivenCategory(req.query.category, (err, imageUrl) => {
    console.log(req.query.category)
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT RETRIEVE IMAGE');
    } else {
      res.status(200).send(imageUrl);
      // console.log();
    }
  });
});

// function to catch get req from client zipcode view
app.get('/user/zipcode', (req, res) => {
  console.log(req.query);
  dbHelpers.getPlantsByGivenZipcode(req.query.zipcode, (err, plants) => {
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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
