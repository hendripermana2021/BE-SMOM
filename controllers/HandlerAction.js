import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Modul = db.tbl_modul;
const Reference = db.tbl_reference;
const Homework = db.tbl_status_homework;
const Readviews = db.tbl_readviews;
const Guru = db.tbl_guru;
const Assignment = db.tbl_modul_assignment;

export const readWhenClickedModul = async (req, res) => {
  try {
    const { id } = req.params;
    const siswaId = req.siswa.id_class;

    // Check if the record already exists
    const existingRecord = await Readviews.findOne({
      where: { id_modul: id, id_siswa: siswaId },
    });

    if (existingRecord) {
      return res.status(200).json({
        code: 200,
        status: true,
        msg: "Duplicate Read",
        data: existingRecord,
      });
    }

    // Create a new read view record
    const readModul = await Readviews.create({
      id_modul: id,
      id_siswa: siswaId,
      status: "read",
    });

    // Send response with the newly created record
    return res.status(200).json({
      code: 200,
      status: true,
      msg: "You have read the module",
      data: readModul,
    });
  } catch (error) {
    // Catch and log errors
    console.error("Kesalahan Membaca:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Terjadi kesalahan pada server",
    });
  }
};
