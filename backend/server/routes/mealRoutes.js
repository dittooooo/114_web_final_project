import { Router } from "express";
import { authRequired } from "../middlewares/auth.js";
import {
  mealController,
  uploadOneImage,
} from "../controllers/mealController.js";

const router = Router();

router.use(authRequired);
router.get("/", mealController.list);
router.get("/:id", mealController.get);
router.post("/", uploadOneImage, mealController.create);
router.put("/:id", uploadOneImage, mealController.update);
router.delete("/:id", mealController.remove);

export default router;
