'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const { Sequelize, DataTypes, Op, col, fn } = require('sequelize');
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;
db.col = col;
db.fn = fn;


// Register your models here
db.User = require('./users.model')(sequelize, DataTypes);
db.Category = require('./category.model')(sequelize, DataTypes);
db.Audio = require('./audio.model')(sequelize, DataTypes);
db.Attempt = require('./attempts.model')(sequelize, DataTypes);
db.ContactMessage = require('./contact.model')(sequelize, DataTypes);

db.Audio.belongsTo(db.Category, {
  foreignKey: "category_id",
});

db.Audio.hasMany(db.Attempt, {
  foreignKey: "audio_id"
});

db.Attempt.belongsTo(db.Audio, {
  foreignKey: "audio_id"
});



module.exports = db;
