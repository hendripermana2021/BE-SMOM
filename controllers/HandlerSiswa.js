import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Siswa = db.tbl_siswa;
const Class = db.tbl_class;

export const getDataSiswa = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Siswa.findAll({
      include: { model: Class, as: "kelas" },
    });

    if (user == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDataSiswaById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Siswa.findOne({
      include: { model: Class, as: "kelas" },
    });

    if (user == "") {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Data Doesn't Exist",
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      msg: "data you searched Found",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSiswa = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "ID tidak valid",
      });
    }

    // Cari data siswa berdasarkan ID
    const user = await Siswa.findOne({ where: { id } });

    // Jika pengguna tidak ditemukan
    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Akun siswa tidak ditemukan atau sudah dihapus!",
      });
    }

    // Cek apakah pengguna mencoba menghapus akun mereka sendiri
    if (req.user && req.user.userId === user.id) {
      return res.status(403).json({
        code: 403,
        status: false,
        msg: "Tidak bisa menghapus akun Anda sendiri",
      });
    }

    // Hapus akun siswa
    await Siswa.destroy({ where: { id } });

    // Kembalikan respons sukses
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Akun siswa berhasil dihapus",
      data: user,
    });
  } catch (error) {
    console.error("Kesalahan saat menghapus akun siswa:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};

export const RegisterSiswa = async (req, res) => {
  const {
    name_siswa,
    sex,
    fathername,
    mothername,
    email,
    password,
    image,
    id_class,
  } = req.body;

  try {
    // Validasi input
    if (
      !name_siswa ||
      !sex ||
      !fathername ||
      !mothername ||
      !email ||
      !password ||
      !id_class
    ) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Semua kolom wajib diisi",
      });
    }

    // Cek apakah email sudah terdaftar
    const existingSiswa = await Siswa.findOne({ where: { email } });
    if (existingSiswa) {
      return res.status(409).json({
        code: 409,
        status: false,
        msg: "Email sudah terdaftar",
      });
    }

    // Generate salt untuk hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Buat entitas baru
    const siswaNew = await Siswa.create({
      name_siswa,
      sex,
      fathername,
      mothername,
      email,
      password: hashPassword,
      real_password: password,
      status: "active",
      // real_password: password, // Sebaiknya tidak menyimpan password asli untuk alasan keamanan
      image,
      id_class,
      role_id: 2, // Hardcoded role_id, sesuaikan dengan kebutuhan
    });

    res.status(201).json({
      code: 201,
      status: true,
      msg: "Registrasi siswa berhasil",
      data: siswaNew,
    });
  } catch (error) {
    console.error("Kesalahan saat registrasi siswa:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};

export const updateDataSiswa = async (req, res) => {
  const { id } = req.params;
  const {
    name_siswa,
    sex,
    fathername,
    mothername,
    email,
    password,
    status,
    image,
    id_class,
    role_id,
  } = req.body;

  try {
    // Cek keberadaan siswa
    const data_before = await Siswa.findOne({ where: { id } });

    if (!data_before) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Siswa tidak ditemukan atau sudah dihapus!",
      });
    }

    // Membuat objek update
    const updateData = {
      name_siswa,
      sex,
      fathername,
      mothername,
      email,
      status,
      image,
      id_class,
      real_password: password,
      role_id,
    };

    // Jika password diberikan, hash password baru
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      updateData.password = hashPassword;
      // Tidak perlu menyimpan real_password untuk alasan keamanan
    }

    // Update data siswa
    await Siswa.update(updateData, { where: { id } });

    // Ambil data yang diperbarui untuk ditampilkan dalam respons
    const data_update = await Siswa.findOne({ where: { id } });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Data siswa berhasil diperbarui",
      data: {
        before: data_before,
        after: data_update,
      },
    });
  } catch (error) {
    console.error("Kesalahan saat memperbarui data siswa:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};
