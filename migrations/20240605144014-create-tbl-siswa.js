'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_siswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_siswa: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      fathername: {
        type: Sequelize.STRING
      },
      mothername: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      id_class: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      real_password: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      accesstoken: {
        type: Sequelize.TEXT
      },
      refreshtoken: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_siswas');
  }
};