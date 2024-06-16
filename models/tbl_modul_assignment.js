'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_modul_assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_modul_assignment.init({
    id_modul: DataTypes.INTEGER,
    id_class: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_modul_assignment',
  });
  return tbl_modul_assignment;
};