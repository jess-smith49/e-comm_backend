//const env = require('dotenv').config();
const express = require('express');
// import sequelize connection
const sequelize = require('./config/connection');
//require routes
const routes = require('./routes');



const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
  })
})

