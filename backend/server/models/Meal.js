import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 80 },
    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner"],
      required: true,
    },
    date: { type: Date, required: true },
    imageUrl: { type: String, default: "" },
    description: { type: String, default: "", maxlength: 100 },
  },
  { timestamps: true }
);

mealSchema.index({ userId: 1, date: -1, createdAt: -1 });

export default mongoose.model("Meal", mealSchema);
