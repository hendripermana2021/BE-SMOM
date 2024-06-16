'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_siswa.init({
    name_siswa: DataTypes.STRING,
    sex: DataTypes.STRING,
    fathername: DataTypes.STRING,
    mothername: DataTypes.STRING,
    status: DataTypes.STRING,
    id_class: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    real_password: DataTypes.STRING,
    role_id: DataTypes.STRING,
    image: DataTypes.STRING,
    accesstoken: DataTypes.TEXT,
    refreshtoken: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tbl_siswa',
  });
  return tbl_siswa;
};