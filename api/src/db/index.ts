const Sequalize = require('sequelize');

const sequelize = new Sequalize();

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch(() => {
        console.log("Unable to connect to the database!");
        process.exit(-1);
      });
