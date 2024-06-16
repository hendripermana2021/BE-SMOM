import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Post = db.tbl_contentpost;
const Reference = db.tbl_reference;

export const getDataPost = async (req, res) => {
  try {
    // Mengambil semua postingan beserta referensinya
    const posts = await Post.findAll({
      include: { model: Reference, as: "Refer" },
    });

    // Memeriksa apakah data postingan kosong
    if (posts.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data tidak ditemukan",
      });
    }

    // Mengembalikan respons sukses dengan data postingan
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Data ditemukan",
      data: posts,
    });
  } catch (error) {
    // Menangkap dan mencatat kesalahan
    console.error("Kesalahan saat mendapatkan data postingan:", error);
    res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};

// Fungsi untuk mendapatkan data postingan berdasarkan ID
export const getDataPostById = async (req, res) => {
  try {
    const { id } = req.params;

    // Memastikan ID valid dan merupakan angka
    if (!id || isNaN(id)) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "ID tidak valid",
      });
    }

    // Mengambil postingan berdasarkan ID beserta referensinya
    const post = await Post.findOne({
      where: { id },
      include: { model: Reference, as: "Refer" },
    });

    // Memeriksa apakah postingan tidak ditemukan
    if (!post) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Data tidak ditemukan",
      });
    }

    // Mengembalikan respons sukses dengan data postingan
    res.status(200).json({
      code: 200,
      status: true,
      msg: "Data ditemukan",
      data: post,
    });
  } catch (error) {
    // Menangkap dan mencatat kesalahan
    console.error(
      "Kesalahan saat mendapatkan data postingan berdasarkan ID:",
      error
    );
    res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi ID untuk memastikan itu adalah angka
    if (!id || isNaN(id)) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "ID tidak valid",
      });
    }

    // Cari postingan berdasarkan ID
    const post = await Post.findOne({ where: { id } });

    // Jika postingan tidak ditemukan, kirimkan respons error
    if (!post) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Postingan tidak ditemukan atau sudah dihapus!",
      });
    }

    // Hapus postingan berdasarkan ID
    await Post.destroy({ where: { id } });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Postingan berhasil dihapus",
      data: post,
    });
  } catch (error) {
    console.error("Kesalahan saat menghapus postingan:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};
export const createPost = async (req, res) => {
  const { id_guru, content, views } = req.body;

  try {
    // Buat data baru untuk postingan
    const newPost = await Post.create({
      id_guru,
      content,
      views,
    });

    // Kirimkan respons berhasil
    return res.status(201).json({
      code: 201,
      status: true,
      msg: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Error while creating a new post:", error);
    // Kirimkan respons kesalahan server
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Internal server error",
    });
  }
};

export const updateDataPost = async (req, res) => {
  const { id } = req.params;
  const { id_guru, content, views } = req.body;

  try {
    // Cari data postingan sebelum di-update
    const data_before = await Post.findOne({
      where: { id },
    });

    // Jika data tidak ditemukan, kirimkan respons bahwa data tidak ada
    if (!data_before) {
      return res.status(404).json({
        code: 404,
        status: false,
        msg: "Post doesn't exist or has been deleted!",
      });
    }

    // Update data postingan
    await Post.update(
      {
        id_guru,
        content,
        views,
      },
      {
        where: { id },
      }
    );

    // Ambil data setelah di-update untuk dikembalikan sebagai respons
    const data_update = await Post.findOne({
      where: { id },
    });

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Post successfully updated",
      data: { data_before, data_update },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Internal server error",
    });
  }
};
