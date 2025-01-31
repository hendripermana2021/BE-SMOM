"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_siswas",
      [
        {
          name_siswa: "Airin Luthfiyah Lubis",
          sex: "P",
          fathername: "KURNIA TARIGAN",
          mothername: "SRI WAHYUNI",
          status: "Active",
          id_class: 1,
          email: "airin@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "Alya Assyifa lubis",
          sex: "P",
          fathername: "ROSIHAN ANWAR BARUS",
          mothername: "YUNITA BR TARIGAN",
          status: "Active",
          id_class: 1,
          email: "alya@gmall.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "Amanda Cindy Laudya Lubis",
          sex: "P",
          fathername: "JUDDIE AIDI S",
          mothername: "YUSMIRAWATI HUTAPEA",
          status: "Active",
          id_class: 1,
          email: "amanda@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "Ardi Izaiyyatul Aqsho",
          sex: "L",
          fathername: "MISROHADI",
          mothername: "ENNY SUSILA",
          status: "Active",
          id_class: 1,
          email: "ardi@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "Dede Oktariadi",
          sex: "L",
          fathername: "SUPRATMAN SIBARANI",
          mothername: "NURHASANAH SIHOMBING",
          status: "Active",
          id_class: 1,
          email: "dede@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "Jihan Amanda Putri Iswandi",
          sex: "P",
          fathername: "BENI TUHARNO",
          mothername: "TENGKU RODIAH",
          status: "Active",
          id_class: 1,
          email: "jihan@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "M. Daffa Parlindungan Hutapea",
          sex: "L",
          fathername: "PERIKOYANTO",
          mothername: "YURSINA YENTI",
          status: "Active",
          id_class: 1,
          email: "fazran@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "M. Fazran",
          sex: "L",
          fathername: "NUARDI",
          mothername: "WATINI / WARTINI",
          status: "Active",
          id_class: 1,
          email: "fazran@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "M. Yudaro Arbi",
          sex: "L",
          fathername: "DIAN IRIANTO, S.Pd.I",
          mothername: "NUR HABIBI LUBIS",
          status: "Active",
          id_class: 1,
          email: "yudaro@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "Muhammad Tafta Zanil",
          sex: "L",
          fathername: "AHMAD JAILANI",
          mothername: "HILDA YULIANI",
          status: "Active",
          id_class: 1,
          email: "muhammad@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "Nabil Jibran Arafa",
          sex: "P",
          fathername: "MISRAN",
          mothername: "NGATENI",
          status: "Active",
          id_class: 1,
          email: "nabil@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "Nasywan Kahirullah",
          sex: "L",
          fathername: "SUBAKTI",
          mothername: "SAMINI",
          status: "Active",
          id_class: 1,
          email: "nasywan@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "Nazla Anastasia",
          sex: "P",
          fathername: "HENDRO SUSILO",
          mothername: "RINY LESTARI",
          status: "Active",
          id_class: 1,
          email: "nazla@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "Sherjihan Hasanah Nasution",
          sex: "P",
          fathername: "PRAYOGI",
          mothername: "MAYA SARI NASUTION",
          status: "Active",
          id_class: 1,
          email: "sherjihan@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
        {
          name_siswa: "Syeikhmal Muhammad Hanif",
          sex: "L",
          fathername: "MISMAN, S.AG, M. Si",
          mothername: "NURAINI LUBIS",
          status: "Active",
          id_class: 1,
          email: "syeikhmal@gmail.com",
          real_password: 12345,
          password: await bcrypt.hash("12345", 10),
          role_id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_siswas", null, {});
  },
};
