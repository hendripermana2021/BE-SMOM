"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_classes",
      [
        {
          id_walkes: "1",
          name_class: "Wijaya Class",
          grade_class: "X",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_walkes: "1",
          name_class: "Sanjaya Class",
          grade_class: "XI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_walkes: "1",
          name_class: "Sri Class",
          grade_class: "XII",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_classes", null, {});
  },
};
