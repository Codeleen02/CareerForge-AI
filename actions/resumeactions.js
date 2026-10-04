"use server";

import User from "@/models/User";
import connectDb from "@/db/connectDb";
import cloudinary from "@/lib/cloudinary";

export const uploadResume = async (formData, userId) => {
  try {
    await connectDb();

    console.log("USER ID:", userId);

    const file = formData.get("resume");

    console.log("FILE:", file);
    console.log("FILE NAME:", file?.name);
    console.log("FILE TYPE:", file?.type);
    console.log("FILE SIZE:", file?.size);

    if (!userId) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    if (!file || !(file instanceof File)) {
      return {
        success: false,
        error: "Resume file is required",
      };
    }

    if (file.type !== "application/pdf") {
      return {
        success: false,
        error: "Only PDF files are allowed",
      };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("BUFFER SIZE:", buffer.length);
console.log("CLOUDINARY CONFIG CHECK:", {
  cloudName:process.env.CLOUDINARY_CLOUD_NAME,
  apiKeyExists: !!process.env.CLOUDINARY_API_KEY,
  apiSecretExists: !!process.env.CLOUDINARY_API_SECRET,
});
console.log("BUFFER SIZE:", buffer.length);

console.log("CLOUDINARY CONFIG CHECK:", {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKeyExists: !!process.env.CLOUDINARY_API_KEY,
  apiSecretExists: !!process.env.CLOUDINARY_API_SECRET,
});

console.log("BEFORE CLOUDINARY PING");

try {
  const ping = await cloudinary.api.ping();

  console.log("CLOUDINARY PING SUCCESS:", ping);
} catch (pingError) {
  console.error("CLOUDINARY PING FAILED:", pingError);
  console.error(
    "CLOUDINARY PING FAILED JSON:",
    JSON.stringify(pingError, null, 2)
  );

  throw pingError;
}

console.log("AFTER CLOUDINARY PING");

const result = await new Promise((resolve, reject) => {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "resumes",
          resource_type: "raw",
          public_id: `resume_${userId}`,
          overwrite: true,
        },

    (error, result) => {
  if (error) {
    console.error("CLOUDINARY ERROR:", error);
    console.error(
      "CLOUDINARY ERROR JSON:",
      JSON.stringify(error, null, 2)
    );
    console.error(
      "CLOUDINARY ERROR KEYS:",
      Object.keys(error || {})
    );

    reject(error);
  } else {
    console.log("CLOUDINARY RESULT:", result);
    resolve(result);
  }
}
      )
      uploadStream.end(buffer)
    })
    // Add error checking for the result payload
if (!result || !result.secure_url) {
  console.error("Cloudinary did not return a valid secure_url:", result);
  return {
    success: false,
    error: "Upload succeeded but no URL was generated",
  };
}
if (!result || !result.secure_url) {
  console.error("Cloudinary did not return a valid secure_url:", result);
  return {
    success: false,
    error: "Upload succeeded but no URL was generated",
  };
}
const resumeUrl = result.secure_url;
console.log("URL TO SAVE TO MONGO:", resumeUrl);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        resume: resumeUrl,
      },
      { new: true }
    );
console.log("RESUME SAVED TO MONGODB:", updatedUser?.resume);
    console.log("UPDATED USER:", updatedUser);

    return {
      success: true,
      resume: resumeUrl,
    };

  } catch (error) {
    console.error("RESUME UPLOAD ERROR:", error);

    return {
      success: false,
      error: error.message || "Failed to upload resume",
    };
  }
};
