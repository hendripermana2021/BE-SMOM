"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_moduls",
      [
        {
          id_guru: "1",
          title: "Melatih Kejayaan dengan Qur'an Hadist",
          subtitle:
            "lorem ipsum asdjalksjdlajsldkaslkjdlkaj sldkaj slkdasdlaksjdlaksjda",
          content: "lorem ipsumasdaslkdjalsj alskdjlaskj dalskjd",
          status_post: "Active",
          image: "",
          for_class: "X",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_guru: "1",
          title: "Melatih Kejayaan dengan Qur'an Hadist",
          subtitle:
            "lorem ipsum asdjalksjdlajsldkaslkjdlkaj sldkaj slkdasdlaksjdlaksjda",
          content: "lorem ipsumasdaslkdjalsj alskdjlaskj dalskjd",
          status_post: "Active",
          image: "",
          for_class: "XI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_guru: "1",
          title: "Melatih Kejayaan dengan Qur'an Hadist",
          subtitle:
            "lorem ipsum asdjalksjdlajsldkaslkjdlkaj sldkaj slkdasdlaksjdlaksjda",
          content: "lorem ipsumasdaslkdjalsj alskdjlaskj dalskjd",
          status_post: "Active",
          image: "",
          for_class: "XII",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_moduls", null, {});
  },
};
