import mongoose from "mongoose";
const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      type: String,
    },
    openings: {
      type: Number,
    },
    jobType: {
      type: String,
      enum: ["internship", "full-time", "part-time", "contract"],
      required: true,
    },

    workMode: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      default: "onsite",
    },

    skills: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
    },
    requirements: {
      type: [String],
    },
    benefits: {
      type: [String],
      default: [],
    },
    
    salary: {
      min: Number,
      max: Number,
    },

    experience: {
      type: String,
    },

    applicationDeadline: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Job ||
  mongoose.model("Job", JobSchema);