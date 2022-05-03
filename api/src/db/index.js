import { readdirSync } from 'fs';
import { join } from 'path';
import Sequelize from 'sequelize';
const config = require(__dirname + '/../config/config.js');
const envs = require(__dirname + "../../config");

const dbName = envs.getAppEnv() === "production" ? config.production.database : config.development.database;
const dbUsername = envs.getAppEnv() === "production" ? config.production.username : config.development.username;
const dbPassword = envs.getAppEnv() === "production" ? config.production.password : config.development.password;
const options = {
  host: envs.getAppEnv() === "production" ? config.production.host : config.development.host,
  dialect: envs.getAppEnv() === "production" ? config.production.dialect : config.development.dialect,
  port: envs.getAppEnv() === "production" ? config.production.port : config.development.port,
  dialectOptions: {
    encrypt: true,
    requestTimeout: 100000
  },
  logging: (msg) => {
    console.log(msg)
  }
};

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, options);

const dataBase = {};
const modelsDir = __dirname + "/../models";

readdirSync(modelsDir)
  .filter(function(file) {
    return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = sequelize.import(join(modelsDir, file));
    dataBase[model.name | String] = model;
  });

Object.keys(dataBase).forEach(function(modelName) {
  if ("associate" in dataBase[modelName]) {
    dataBase[modelName].associate(dataBase);
  }
});

dataBase.sequelize = sequelize;
dataBase.Sequelize = Sequelize;

export default dataBase;
