// "use server";

// import User from "@/models/User";
// import connectDb from "@/db/connectDb";
// import cloudinary from "@/lib/cloudinary";

// export const uploadResume = async (formData, userId) => {
//   try {
//     await connectDb();

//     console.log("USER ID:", userId);

//     const file = formData.get("resume");

//     console.log("FILE:", file);
//     console.log("FILE NAME:", file?.name);
//     console.log("FILE TYPE:", file?.type);
//     console.log("FILE SIZE:", file?.size);

//     if (!userId) {
//       return {
//         success: false,
//         error: "User not authenticated",
//       };
//     }

//     if (!file || !(file instanceof File)) {
//       return {
//         success: false,
//         error: "Resume file is required",
//       };
//     }

//     if (file.type !== "application/pdf") {
//       return {
//         success: false,
//         error: "Only PDF files are allowed",
//       };
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     console.log("BUFFER SIZE:", buffer.length);
//     console.log("CLOUDINARY CONFIG CHECK:", {
//     cloudName:process.env.CLOUDINARY_CLOUD_NAME,
//     apiKeyExists: !!process.env.CLOUDINARY_API_KEY,
//     apiSecretExists: !!process.env.CLOUDINARY_API_SECRET,
// });
// console.log("BUFFER SIZE:", buffer.length);

//     const result = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: "resumes",
//           resource_type: "raw",
//           public_id: `resume_${userId}`,
//           overwrite: true,
//         },

//     (error, result) => {
// if (error) {
//   console.error("========== CLOUDINARY ERROR ==========");
//   console.error("ERROR:", error);
//   console.error("MESSAGE:", error?.message);
//   console.error("HTTP CODE:", error?.http_code);
//   console.error("NAME:", error?.name);
//   console.error("FULL ERROR:", JSON.stringify(error, null, 2));
//   console.error("ERROR KEYS:", Object.keys(error || {}));
//   console.error("RAW ERROR:", error);
//   console.error("======================================");

//   reject(error);
//   } else {
//     console.log("CLOUDINARY RESULT:", result);
//     resolve(result);
//   }
// }
//       )
//       uploadStream.end(buffer)
//     })
//     // Add error checking for the result payload
// if (!result || !result.secure_url) {
//   console.error("Cloudinary did not return a valid secure_url:", result);
//   return {
//     success: false,
//     error: "Upload succeeded but no URL was generated",
//   };
// }
// if (!result || !result.secure_url) {
//   console.error("Cloudinary did not return a valid secure_url:", result);
//   return {
//     success: false,
//     error: "Upload succeeded but no URL was generated",
//   };
// }
// const resumeUrl = result.secure_url;
// console.log("URL TO SAVE TO MONGO:", resumeUrl);

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         resume: resumeUrl,
//       },
//       { new: true }
//     );
// console.log("RESUME SAVED TO MONGODB:", updatedUser?.resume);
//     console.log("UPDATED USER:", updatedUser);

//     return {
//       success: true,
//       resume: resumeUrl,
//     };

//   } catch (error) {
//     console.error("RESUME UPLOAD ERROR:", error);

//     return {
//       success: false,
//       error: error.message || "Failed to upload resume",
//     };
//   }
// };

"use server";

import User from "@/models/User";
import connectDb from "@/db/connectDb";
import cloudinary from "@/lib/cloudinary";

export const uploadResume = async (formData, userId) => {
  console.log("🔥🔥🔥 NEW RESUME ACTION VERSION 123 🔥🔥🔥");

  try {
    // -----------------------------------------
    // 1. Connect to MongoDB
    // -----------------------------------------
    await connectDb();
    console.log("🔥 CONNECTED TO DB");

    // -----------------------------------------
    // 2. Test Cloudinary connection
    // -----------------------------------------
    console.log("🔥 ABOUT TO PING CLOUDINARY");

    try {
      const ping = await cloudinary.api.ping();
      console.log("🔥 CLOUDINARY PING RESULT:", ping);
    } catch (pingError) {
      console.error("🔥 CLOUDINARY PING ERROR:", pingError);
      console.error("PING MESSAGE:", pingError?.message);
      console.error("PING HTTP CODE:", pingError?.http_code);
    }

    // -----------------------------------------
    // 3. Validate user
    // -----------------------------------------
    console.log("USER ID:", userId);

    if (!userId) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    // -----------------------------------------
    // 4. Get resume file
    // -----------------------------------------
    const file = formData.get("resume");

    console.log("FILE:", file);
    console.log("FILE NAME:", file?.name);
    console.log("FILE TYPE:", file?.type);
    console.log("FILE SIZE:", file?.size);

    if (!file || !(file instanceof File)) {
      return {
        success: false,
        error: "Resume file is required",
      };
    }

    // -----------------------------------------
    // 5. Validate PDF
    // -----------------------------------------
    if (file.type !== "application/pdf") {
      return {
        success: false,
        error: "Only PDF files are allowed",
      };
    }

    // -----------------------------------------
    // 6. Convert file to Buffer
    // -----------------------------------------
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("BUFFER SIZE:", buffer.length);

    if (!buffer.length) {
      return {
        success: false,
        error: "Resume file is empty",
      };
    }

    // -----------------------------------------
    // 7. Check Cloudinary environment variables
    // -----------------------------------------
    console.log("========== CLOUDINARY CONFIG ==========");
    console.log(
      "Cloud name:",
      process.env.CLOUDINARY_CLOUD_NAME
    );
    console.log(
      "API key exists:",
      !!process.env.CLOUDINARY_API_KEY
    );
    console.log(
      "API secret exists:",
      !!process.env.CLOUDINARY_API_SECRET
    );
    console.log("========================================");

    // -----------------------------------------
    // 8. Upload PDF to Cloudinary
    // -----------------------------------------
    console.log("🔥 STARTING CLOUDINARY UPLOAD");

    // const result = await new Promise((resolve, reject) => {
    //   const uploadStream = cloudinary.uploader.upload_stream(
    //     {
    //       folder: "resumes",
    //       resource_type: "raw",
    //       public_id: `resume_${userId}`,
    //       overwrite: true,
    //     },
    //     (error, result) => {
    //       if (error) {
    //         console.error(
    //           "========== CLOUDINARY UPLOAD ERROR =========="
    //         );

    //         console.error("ERROR:", error);
    //         console.error("MESSAGE:", error?.message);
    //         console.error("HTTP CODE:", error?.http_code);
    //         console.error("NAME:", error?.name);

    //         console.error(
    //           "FULL ERROR:",
    //           JSON.stringify(error, null, 2)
    //         );

    //         console.error(
    //           "ERROR KEYS:",
    //           Object.keys(error || {})
    //         );

    //         console.error(
    //           "==============================================="
    //         );

    //         reject(error);
    //         return;
    //       }

    //       console.log(
    //         "🔥 CLOUDINARY UPLOAD SUCCESS:",
    //         result
    //       );

    //       resolve(result);
    //     }
    //   );

    //   uploadStream.end(buffer);
    // });
console.log("🔥🔥🔥 STARTING DIRECT CLOUDINARY TEST 🔥🔥🔥");

try {
  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = {
    folder: "resumes",
    public_id: `resume_${userId}`,
    timestamp,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  const cloudinaryForm = new FormData();

  cloudinaryForm.append(
    "file",
    new Blob([buffer], { type: "application/pdf" }),
    file.name
  );

  cloudinaryForm.append(
    "api_key",
    process.env.CLOUDINARY_API_KEY
  );

  cloudinaryForm.append(
    "timestamp",
    timestamp.toString()
  );

  cloudinaryForm.append(
    "folder",
    "resumes"
  );

  cloudinaryForm.append(
    "public_id",
    `resume_${userId}`
  );

  cloudinaryForm.append(
    "signature",
    signature
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`,
    {
      method: "POST",
      body: cloudinaryForm,
    }
  );

  console.log("🔥 CLOUDINARY STATUS:", response.status);
  console.log(
    "🔥 CLOUDINARY X-CLD-ERROR:",
    response.headers.get("x-cld-error")
  );

  const responseText = await response.text();

  console.log("🔥 CLOUDINARY RAW RESPONSE:", responseText);

  if (!response.ok) {
    return {
      success: false,
      error: `Cloudinary ${response.status}: ${responseText}`,
    };
  }

  const result = JSON.parse(responseText);

  console.log("🔥 CLOUDINARY SUCCESS:", result);

  const resumeUrl = result.secure_url;

  await User.findByIdAndUpdate(
    userId,
    { resume: resumeUrl },
    { new: true }
  );

  return {
    success: true,
    resume: resumeUrl,
  };

} catch (error) {
  console.error("🔥 DIRECT CLOUDINARY TEST ERROR:", error);

  return {
    success: false,
    error: error?.message || "Cloudinary upload failed",
  };
}
    // -----------------------------------------
    // 9. Validate Cloudinary result
    // -----------------------------------------
    if (!result || !result.secure_url) {
      console.error(
        "Cloudinary returned an invalid result:",
        result
      );

      return {
        success: false,
        error: "Upload succeeded but no URL was generated",
      };
    }

    const resumeUrl = result.secure_url;

    console.log(
      "URL TO SAVE TO MONGO:",
      resumeUrl
    );

    // -----------------------------------------
    // 10. Save resume URL to MongoDB
    // -----------------------------------------
    const updatedUser =
      await User.findByIdAndUpdate(
        userId,
        {
          resume: resumeUrl,
        },
        {
          new: true,
        }
      );

    console.log(
      "RESUME SAVED TO MONGODB:",
      updatedUser?.resume
    );

    // -----------------------------------------
    // 11. Return success
    // -----------------------------------------
    return {
      success: true,
      resume: resumeUrl,
    };

  } catch (error) {
    console.error(
      "========== RESUME UPLOAD ERROR =========="
    );

    console.error("ERROR:", error);
    console.error("MESSAGE:", error?.message);
    console.error("HTTP CODE:", error?.http_code);

    console.error(
      "FULL ERROR:",
      JSON.stringify(error, null, 2)
    );

    console.error(
      "=========================================="
    );

    return {
      success: false,
      error:
        error?.message ||
        "Failed to upload resume",
    };
  }
};

