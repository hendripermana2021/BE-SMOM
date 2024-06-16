'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_gurus",
      [
        {
          name_guru: "Yudi",
          sex: "L",
          bid_pendidikan : "Qur'an Hadist",
          pendidikan : "S1",
          email :"yudhi@gmail.com",
          password : await bcrypt.hash("12345", 10),
          real_password : "12345",
          role_id : "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_gurus", null, {});
  },
};
