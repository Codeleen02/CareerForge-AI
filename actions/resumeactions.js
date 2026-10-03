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
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKeyExists: !!process.env.CLOUDINARY_API_KEY,
  apiSecretExists: !!process.env.CLOUDINARY_API_SECRET,
});
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "resumes",
          resource_type: "raw",
          public_id: `resume_${userId}.pdf`,
          overwrite: true,
        },
    //     (error, result) => {
    //       if (error) {
    //         console.error("CLOUDINARY ERROR:", error);
    //         reject(error);
    //       } else {
    //         console.log("CLOUDINARY RESULT:", result);
    //         resolve(result);
    //       }
    //     }
    //   );

    //   uploadStream.end(buffer);
    // });

    // console.log("CLOUDINARY URL:", result.secure_url);

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

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        resume: result.secure_url,
      },
      { new: true }
    );

    console.log("UPDATED USER:", updatedUser);

    return {
      success: true,
      resumeUrl: result.secure_url,
    };

  } catch (error) {
    console.error("RESUME UPLOAD ERROR:", error);

    return {
      success: false,
      error: error.message || "Failed to upload resume",
    };
  }
};

