"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_class.init(
    {
      name_class: DataTypes.STRING,
      grade_class: DataTypes.STRING,
      id_walkes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbl_class",
    }
  );
  return tbl_class;
};
