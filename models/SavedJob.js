import mongoose from "mongoose";

const SavedJobSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

SavedJobSchema.index(
  { student: 1, job: 1 },
  { unique: true }
);

export default mongoose.models.SavedJob ||
  mongoose.model("SavedJob", SavedJobSchema);