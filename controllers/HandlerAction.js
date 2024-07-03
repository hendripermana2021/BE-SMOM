import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const Modul = db.tbl_modul;
const Readviews = db.tbl_readviews;
const Guru = db.tbl_guru;
const Siswa = db.tbl_siswa;
const Class = db.tbl_class;

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

export const Dashboard = async (req, res) => {
  try {
    const currentUser = await req.user;
    if (!currentUser) {
      return res.status(400).json({
        code: 400,
        status: false,
        msg: "Invalid user credentials",
      });
    }

    const getSiswaById = await Siswa.findOne({
      where: { id: currentUser.userId },
      include: { model: Class, as: "kelas" },
    });

    let modulCount = 0;
    let kelasCount = 0;

    if (currentUser.role_id == "1") {
      modulCount = await Modul.count();
      kelasCount = await Class.count();
    } else if (currentUser.role_id == "2") {
      modulCount = await Modul.count({
        where: { id_guru: currentUser.userId },
      });
      kelasCount = await Class.count({
        where: { id_walkes: currentUser.userId },
      });
    } else if (currentUser.role_id == "3") {
      modulCount = await Modul.count({
        where: { for_class: getSiswaById.kelas.grade_class },
      });
    }

    const guruCount = await Guru.count();
    const siswaCount = await Siswa.count();

    return res.status(200).json({
      code: 200,
      status: true,
      msg: "Dashboard data retrieved successfully",
      data: {
        modulCount,
        kelasCount,
        guruCount,
        siswaCount,
      },
    });
  } catch (error) {
    console.error("Error retrieving dashboard data:", error);
    return res.status(500).json({
      code: 500,
      status: false,
      msg: "Internal server error",
    });
  }
};
