"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tbl_guru = require("../models/tbl_guru.js")(sequelize, Sequelize);
db.tbl_siswa = require("../models/tbl_siswa.js")(sequelize, Sequelize);
db.tbl_class = require("../models/tbl_class.js")(sequelize, Sequelize);
db.tbl_modul = require("../models/tbl_modul.js")(sequelize, Sequelize);
db.tbl_reference = require("../models/tbl_reference.js")(sequelize, Sequelize);
db.tbl_modul_assignment = require("../models/tbl_modul_assignment.js")(
  sequelize,
  Sequelize
);
db.tbl_readviews = require("../models/tbl_readviews.js")(sequelize, Sequelize);
db.tbl_contentpost = require("../models/tbl_contentpost.js")(
  sequelize,
  Sequelize
);

//ASSOCIATE MODUL SISWA
db.tbl_modul_assignment.hasMany(db.tbl_modul, {
  foreignKey: "id",
  as: "modul",
  sourceKey: "id_modul",
});

// db.tbl_modul_assignment.belongsTo(db.tbl_modul, {
//   foreignKey: "id_class",
//   as: "modul",
//   targetKey: "id",
// });

// ASSOCIATE MODUL
db.tbl_modul.hasMany(db.tbl_reference, {
  foreignKey: "id_modul",
  as: "referensi",
  sourceKey: "id",
});

db.tbl_modul.hasMany(db.tbl_readviews, {
  foreignKey: "id_modul",
  as: "views",
  sourceKey: "id",
});

db.tbl_modul.belongsTo(db.tbl_guru, {
  foreignKey: "id_guru",
  as: "publisher",
  targetKey: "id",
});

//ASSOCIATE GURU
db.tbl_guru.hasMany(db.tbl_modul, {
  foreignKey: "id_guru",
  as: "referensi",
  sourceKey: "id",
});

db.tbl_guru.belongsTo(db.tbl_class, {
  foreignKey: "id",
  as: "kelas",
  targetKey: "id_walkes",
});

//ASSOCIATE SISWA
db.tbl_siswa.belongsTo(db.tbl_class, {
  foreignKey: "id_class",
  as: "class",
  targetKey: "id",
});

//ASSOCIATE COONTENT POST
db.tbl_contentpost.hasMany(db.tbl_reference, {
  foreignKey: "id_content",
  as: "refer",
  sourceKey: "id",
});

//ASSOCIATE CLASS
db.tbl_class.belongsTo(db.tbl_guru, {
  foreignKey: "id_walkes",
  as: "wali_kelas",
  targetKey: "id",
});

//ASSOCIATE SISWA
db.tbl_siswa.belongsTo(db.tbl_class, {
  foreignKey: "id_class",
  as: "kelas",
  targetKey: "id",
});

module.exports = db;
