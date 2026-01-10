import User from "../models/User.js";

export const userRepository = {
  findByEmail(email) {
    return User.findOne({ email });
  },
  create(data) {
    return User.create(data);
  },
  findById(id) {
    return User.findById(id).select("_id username email createdAt");
  },
};
