import Meal from "../models/Meal.js";

export const mealRepository = {
  listByUser(userId, dateOpt) {
    const q = { userId };
    if (dateOpt) {
      const start = new Date(dateOpt);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      q.date = { $gte: start, $lt: end };
    }
    return Meal.find(q).sort({ date: -1, createdAt: -1 });
  },
  findOwnedById(userId, id) {
    return Meal.findOne({ _id: id, userId });
  },
  create(data) {
    return Meal.create(data);
  },
  save(doc) {
    return doc.save();
  },
  delete(doc) {
    return doc.deleteOne();
  },
};
