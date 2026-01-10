import { authService } from "../services/authService.js";

export const authController = {
  async register(req, res, next) {
    try {
      const out = await authService.register(req.body, process.env.JWT_SECRET);
      res.status(201).json(out);
    } catch (e) {
      next(e);
    }
  },

  async login(req, res, next) {
    try {
      const out = await authService.login(req.body, process.env.JWT_SECRET);
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
};
