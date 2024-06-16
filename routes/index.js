import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  Login,
  handleGetRoot,
  Logout,
  whoAmI,
  getDataGuru,
  getDataGuruById,
  deleteGuru,
  updateDataGuru,
  RegisterGuru,
} from "../controllers/HandlerUsers.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  RegisterSiswa,
  deleteSiswa,
  getDataSiswa,
  getDataSiswaById,
  updateDataSiswa,
} from "../controllers/HandlerSiswa.js";
import {
  createClass,
  deleteClass,
  getDataClass,
  getDataClassById,
  updateDataClass,
} from "../controllers/HandlerClass.js";
import {
  createModul,
  deleteModul,
  getDataModul,
  getDataModulById,
  getDataModulForSiswa,
  updateDataModul,
} from "../controllers/HandlerModul.js";
import {
  createPost,
  deletePost,
  getDataPost,
  getDataPostById,
  updateDataPost,
} from "../controllers/HandlerPost.js";
import { readWhenClickedModul } from "../controllers/HandlerAction.js";
export const router = express.Router();

export const prefix = "/v1/api/";

//ROUTE ACTION
router.post(prefix + "read-modul/:id", verifyToken, readWhenClickedModul);

//ROUTE GENERAL
router.get(prefix, handleGetRoot);
router.get(prefix + "profile", verifyToken, whoAmI);
router.post(prefix + "login", Login);
router.delete(prefix + "logout", verifyToken, Logout);

//ROUTE DATA GURU
router.get(prefix + "guru", verifyToken, getDataGuru);
router.get(prefix + "guru/byid/:id", verifyToken, getDataGuruById);
router.delete(prefix + "guru/delete/:id", verifyToken, deleteGuru);
router.put(prefix + "guru/update/:id", verifyToken, updateDataGuru);
router.post(prefix + "guru/add", verifyToken, RegisterGuru);

//ROUTE DATA SISWA
router.get(prefix + "siswa", verifyToken, getDataSiswa);
router.get(prefix + "siswa/byid/:id", verifyToken, getDataSiswaById);
router.delete(prefix + "siswa/delete/:id", verifyToken, deleteSiswa);
router.put(prefix + "siswa/update/:id", verifyToken, updateDataSiswa);
router.post(prefix + "siswa/add", verifyToken, RegisterSiswa);

//ROUTE DATA CLASS
router.get(prefix + "class", verifyToken, getDataClass);
router.get(prefix + "class/byid/:id", verifyToken, getDataClassById);
router.delete(prefix + "class/delete/:id", verifyToken, deleteClass);
router.put(prefix + "class/update/:id", verifyToken, updateDataClass);
router.post(prefix + "class/add", verifyToken, createClass);

//ROUTE DATA CLASS MODUL
router.get(prefix + "modul", verifyToken, getDataModul);
router.get(prefix + "modul/byid/:id", verifyToken, getDataModulById);
router.delete(prefix + "modul/delete/:id", verifyToken, deleteModul);
router.put(prefix + "modul/update/:id", verifyToken, updateDataModul);
router.post(prefix + "modul/add", verifyToken, createModul);
router.get(prefix + "modul/siswa", verifyToken, getDataModulForSiswa);

//ROUTE DATA CLASS POST
router.get(prefix + "post", verifyToken, getDataPost);
router.get(prefix + "post/byid/:id", verifyToken, getDataPostById);
router.delete(prefix + "post/delete/:id", verifyToken, deletePost);
router.put(prefix + "post/update/:id", verifyToken, updateDataPost);
router.post(prefix + "post/add", verifyToken, createPost);

export default router;
