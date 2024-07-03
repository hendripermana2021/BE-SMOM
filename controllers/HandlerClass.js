import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Class = db.tbl_class;
const Guru = db.tbl_guru;

export const getDataClass = async (req, res) => {
  try {
    // Mengambil semua data kelas
    const kelas = await Class.findAll({
      include: { model: Guru, as: "wali_kelas" },
    });

    // Memeriksa apakah data kelas kosong
    if (!kelas || kelas.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data tidak ditemukan",
      });
    }

    // Mengembalikan respons berhasil
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Data kelas ditemukan",
      data: kelas,
    });
  } catch (error) {
    console.error("Kesalahan saat mengambil data kelas:", error);
    res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};

export const getDataClassById = async (req, res) => {
  try {
    const { id } = req.params;

    // Memastikan ID valid
    if (!id) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "ID tidak valid",
      });
    }

    // Mengambil data kelas berdasarkan ID
    const kelas = await Class.findOne({
      include: { model: Guru, as: "wali_kelas" },
    });

    // Memeriksa apakah data kelas ditemukan
    if (!kelas) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data kelas tidak ditemukan",
      });
    }

    // Mengembalikan respons berhasil
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Data kelas ditemukan",
      data: kelas,
    });
  } catch (error) {
    console.error("Kesalahan saat mengambil data kelas:", error);
    res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    // Memastikan ID valid
    if (!id) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "ID tidak valid",
      });
    }

    // Mencari kelas berdasarkan ID
    const kelas = await Class.findOne({ where: { id } });

    // Memeriksa apakah kelas ditemukan
    if (!kelas) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Kelas tidak ditemukan atau sudah dihapus!",
      });
    }

    // Menghapus kelas berdasarkan ID
    await Class.destroy({
      where: { id },
    });

    // Mengembalikan respons berhasil
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Kelas berhasil dihapus",
      data: kelas,
    });
  } catch (error) {
    console.error("Kesalahan saat menghapus kelas:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};
export const createClass = async (req, res) => {
  const { id_walkes, name_class } = req.body;

  try {
    // Membuat kelas baru
    const classNew = await Class.create({
      id_walkes,
      name_class,
    });

    // Memberikan respons dengan data kelas yang baru dibuat
    res.status(201).json({
      code: 201,
      status: true,
      msg: "Kelas baru berhasil dibuat",
      data: classNew, // Menggunakan variabel yang benar untuk data respons
    });
  } catch (error) {
    // Menangkap kesalahan jika terjadi
    console.error("Kesalahan saat membuat kelas baru:", error);
    res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};

export const updateDataClass = async (req, res) => {
  const { id } = req.params;
  const { id_walkes, name_classs } = req.body;

  try {
    // Mencari data kelas sebelum pembaruan
    const data_before = await Class.findOne({
      where: { id },
    });

    // Memeriksa apakah data kelas ditemukan
    if (data_before === null) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data kelas tidak ditemukan atau sudah dihapus!",
      });
    }

    // Melakukan pembaruan pada data kelas
    await Class.update(
      {
        id_walkes,
        name_classs,
      },
      {
        where: { id },
      }
    );

    // Mengambil data kelas yang diperbarui
    const data_update = await Class.findOne({
      where: { id },
    });

    // Memberikan respons dengan data sebelum dan sesudah pembaruan
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Data kelas berhasil diperbarui",
      data: { data_before, data_update },
    });
  } catch (error) {
    // Menangkap kesalahan jika terjadi
    console.error("Kesalahan saat memperbarui data kelas:", error);
    res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};
