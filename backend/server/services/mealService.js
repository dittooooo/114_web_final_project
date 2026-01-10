import fs from "fs";
import path from "path";
import { mealRepository } from "../repositories/mealRepository.js";
import { assertDescMax100, assertNotFutureDate } from "../utils/validators.js";

function safeUnlink(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (_) {}
}

export const mealService = {
  async list(userId, dateStr) {
    const dateOpt = dateStr ? assertNotFutureDate(dateStr) : null;
    return mealRepository.listByUser(userId, dateOpt);
  },

  async get(userId, id) {
    const doc = await mealRepository.findOwnedById(userId, id);
    if (!doc) {
      const err = new Error("Meal not found");
      err.status = 404;
      throw err;
    }
    return doc;
  },

  async create(userId, payload, file, uploadsDirAbs) {
    const title = String(payload.title || "").trim();
    if (!title) {
      const err = new Error("Title is required");
      err.status = 400;
      throw err;
    }

    const mealType = payload.mealType;
    if (!["Breakfast", "Lunch", "Dinner"].includes(mealType)) {
      const err = new Error("Invalid mealType");
      err.status = 400;
      throw err;
    }

    const date = assertNotFutureDate(payload.date || new Date());
    const description = assertDescMax100(payload.description || "");

    const imageUrl = file ? `/uploads/${file.filename}` : "";

    return mealRepository.create({
      userId,
      title,
      mealType,
      date,
      description,
      imageUrl,
    });
  },

  async update(userId, id, payload, file, uploadsDirAbs) {
    const doc = await this.get(userId, id);

    if ("title" in payload) {
      const title = String(payload.title || "").trim();
      if (!title) {
        const err = new Error("Title is required");
        err.status = 400;
        throw err;
      }
      doc.title = title;
    }

    if ("mealType" in payload) {
      const mealType = payload.mealType;
      if (!["Breakfast", "Lunch", "Dinner"].includes(mealType)) {
        const err = new Error("Invalid mealType");
        err.status = 400;
        throw err;
      }
      doc.mealType = mealType;
    }

    if ("date" in payload) {
      doc.date = assertNotFutureDate(payload.date);
    }

    if ("description" in payload) {
      doc.description = assertDescMax100(payload.description || "");
    }

    // 圖片：可更新/可移除
    const removeImage = String(payload.removeImage || "") === "true";
    if (removeImage && doc.imageUrl) {
      const oldAbs = path.join(uploadsDirAbs, path.basename(doc.imageUrl));
      safeUnlink(oldAbs);
      doc.imageUrl = "";
    }

    if (file) {
      // 新圖上傳：刪舊圖
      if (doc.imageUrl) {
        const oldAbs = path.join(uploadsDirAbs, path.basename(doc.imageUrl));
        safeUnlink(oldAbs);
      }
      doc.imageUrl = `/uploads/${file.filename}`;
    }

    return mealRepository.save(doc);
  },

  async remove(userId, id, uploadsDirAbs) {
    const doc = await this.get(userId, id);
    if (doc.imageUrl) {
      const oldAbs = path.join(uploadsDirAbs, path.basename(doc.imageUrl));
      safeUnlink(oldAbs);
    }
    await mealRepository.delete(doc);
    return { ok: true };
  },
};
