'use strict';

import fs from 'fs';
import { basename as _basename, join } from 'path';
import { Sequelize } from 'sequelize';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js');

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
  logging: (msg: any) => {
    console.log(msg)
  }
};

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, options);

const db = {};
const modelsDir = __dirname + "/../models";
fs.readdirSync(modelsDir)
  .filter(function(file) {
    return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(modelsDir, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
