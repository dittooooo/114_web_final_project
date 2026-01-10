import multer from "multer";
import path from "path";
import { mealService } from "../services/mealService.js";

const uploadsDirAbs = path.resolve("uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDirAbs),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext)
      ? ext
      : ".jpg";
    cb(null, `${Date.now()}-${Math.random().toString(16).slice(2)}${safeExt}`);
  },
});

function fileFilter(req, file, cb) {
  const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);
  cb(ok ? null : new Error("Only jpg/png/webp allowed"), ok);
}

export const uploadOneImage = multer({
  storage,
  fileFilter,
  limits: { files: 1, fileSize: 3 * 1024 * 1024 }, // 3MB
}).single("image");

export const mealController = {
  async list(req, res, next) {
    try {
      const meals = await mealService.list(req.userId, req.query.date);
      res.json(meals);
    } catch (e) {
      next(e);
    }
  },

  async get(req, res, next) {
    try {
      const meal = await mealService.get(req.userId, req.params.id);
      res.json(meal);
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const meal = await mealService.create(
        req.userId,
        req.body,
        req.file,
        uploadsDirAbs
      );
      res.status(201).json(meal);
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const meal = await mealService.update(
        req.userId,
        req.params.id,
        req.body,
        req.file,
        uploadsDirAbs
      );
      res.json(meal);
    } catch (e) {
      next(e);
    }
  },

  async remove(req, res, next) {
    try {
      const out = await mealService.remove(
        req.userId,
        req.params.id,
        uploadsDirAbs
      );
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
};
