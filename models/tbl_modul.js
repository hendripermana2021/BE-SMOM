"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_modul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  tbl_modul.init(
    {
      id_guru: DataTypes.INTEGER,
      title: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      content: DataTypes.TEXT,
      for_class: DataTypes.STRING,
      status_post: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tbl_modul",
    }
  );
  return tbl_modul;
};
