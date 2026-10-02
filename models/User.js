import mongoose from "mongoose";
const { Schema, model } = mongoose;
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    image: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
    },

    location: {
      type: String,
    },

    bio: {
      type: String,
    },

    skills: {
      type: [String],
      default: [],
    },

    github: {
      type: String,
    },

    linkedin: {
      type: String,
    },

    resume: {
      type: String,
      default:"",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  model("User", UserSchema);