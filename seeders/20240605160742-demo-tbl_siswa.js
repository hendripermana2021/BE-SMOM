"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_siswas",
      [
        {
          name_siswa: "saka",
          sex: "L",
          fathername: "Hidayat",
          mothername: "Sri",
          status: "1",
          image: "",
          id_class: "1",
          email: "saka@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          role_id: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_siswas", null, {});
  },
};
