'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_contentpost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_contentpost.init({
    id_guru: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    views: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_contentpost',
  });
  return tbl_contentpost;
};