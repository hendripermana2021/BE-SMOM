'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_references",
      [
        {
          id_modul: "1",
          id_content: "",
          link : "https://facebook.com",
          source : "google",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_modul: "",
          id_content: "1",
          link : "https://twitter.com",
          source : "Media Sosial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_references", null, {});
  },
};
