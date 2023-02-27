'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

import route from './route';
import favoritos from './favoritos';
import unidades from './unidades';
import user from './user';
import rutas from './rutas';
import schedule from './schedule'
import document from './document';
import usuarios from './usuarios';

/*
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
*/

db.Rutas = rutas(sequelize, Sequelize.DataTypes);
db.Route = route(sequelize, Sequelize.DataTypes);
db.Favoritos = favoritos(sequelize, Sequelize.DataTypes);
db.Unidades = unidades(sequelize, Sequelize.DataTypes);
db.User = user(sequelize, Sequelize.DataTypes);
db.Schedules = schedule(sequelize, Sequelize.DataTypes);
db.Document = document(sequelize, Sequelize.DataTypes);
db.Usuarios = usuarios(sequelize, Sequelize.DataTypes)


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;