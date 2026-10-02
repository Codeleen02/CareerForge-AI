import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
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

    resume: {
      type: String,
    },

    coverLetter: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "applied",
        "reviewing",
        "shortlisted",
        "rejected",
        "accepted",
      ],
      default: "applied",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
ApplicationSchema.index(
  { student: 1, job: 1 },
  { unique: true }
);
export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);