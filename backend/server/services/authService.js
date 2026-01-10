import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository.js";
import { isValidEmail } from "../utils/validators.js";

export const authService = {
  async register({ username, email, password }, jwtSecret) {
    if (!username || String(username).trim().length < 2) {
      const err = new Error("請輸入使用者名稱");
      err.status = 400;
      throw err;
    }
    if (!isValidEmail(email)) {
      const err = new Error("Email 格式錯誤");
      err.status = 400;
      throw err;
    }
    if (!password || String(password).length < 6) {
      const err = new Error("密碼至少 6 碼");
      err.status = 400;
      throw err;
    }

    const existed = await userRepository.findByEmail(
      String(email).toLowerCase()
    );
    if (existed) {
      const err = new Error("Email 已存在");
      err.status = 409;
      throw err;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await userRepository.create({
      username: String(username).trim(),
      email: String(email).toLowerCase(),
      password: hashed,
    });

    return { id: user._id };
  },

  async login({ email, password }, jwtSecret) {
    if (!isValidEmail(email)) {
      const err = new Error("Email 格式錯誤");
      err.status = 400;
      throw err;
    }
    const user = await userRepository.findByEmail(String(email).toLowerCase());
    if (!user) {
      const err = new Error("Email 或密碼錯誤");
      err.status = 401;
      throw err;
    }

    const ok = await bcrypt.compare(password || "", user.password);
    if (!ok) {
      const err = new Error("Email 或密碼錯誤");
      err.status = 401;
      throw err;
    }

    const token = jwt.sign({ userId: String(user._id) }, jwtSecret, {
      expiresIn: "7d",
    });
    return {
      token,
      user: {
        id: String(user._id),
        username: user.username,
        email: user.email,
      },
    };
  },
};
