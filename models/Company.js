import mongoose from "mongoose";
const {Schema,model} = mongoose;
const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    logo: {
      type: String,
    },
    website: {
      type: String,
    },

    location: {
      type: String,
    },

    industry: {
      type: String,
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Company ||
  model("Company", CompanySchema);