'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_reference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_reference.init({
    id_modul: DataTypes.INTEGER,
    id_content: DataTypes.STRING,
    link: DataTypes.STRING,
    source: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_reference',
  });
  return tbl_reference;
};