"use server";

import Application from "@/models/Application";
import User from "@/models/User"
import Job from "@/models/Job";
import connectDb from "@/db/connectDb";
import gemini from "@/lib/gemini";
import { createPartFromUri } from "@google/genai";
// Student applies for a job
export const applyJob = async (jobId, userId) => {
  try {
    await connectDb();

    if (!jobId) {
      return {
        success: false,
        error: "Job ID is required",
      };
    }

    if (!userId) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const existingApplication = await Application.findOne({
      student: userId,
      job: jobId,
    });

    const application = await Application.create({
      student: userId,
      job: jobId,
      status: "applied",
    });

    return {
      success: true,
      applicationId: application._id.toString(),
    };
  } catch (error) {
    console.error("Failed to apply for job:", error);

    return {
      success: false,
      error: error.message || "Failed to apply for job",
    };
  }
};


// Fetch all applicants
export const fetchapplicants = async () => {
  try {
    await connectDb();

    const applicants = await Application.find({
      status: "applied",
    })
      .populate("student")
      .populate("job")
      .lean();

    return {
      success: true,
      applicants: JSON.parse(JSON.stringify(applicants)),
    };
  } catch (error) {
    console.error("Failed to fetch applicants:", error);

    return {
      success: false,
      error: error.message || "Failed to fetch applicants",
    };
  }
};

export const updateApplicationStatus = async (
  applicationId,
  userId,
  status
) => {
  try {
    await connectDb();

    if (!applicationId) {
      return {
        success: false,
        error: "Application ID is required",
      };
    }

    if (!userId) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const allowedStatuses = ["shortlisted", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return {
        success: false,
        error: "Invalid application status",
      };
    }

    const application = await Application.findById(
      applicationId
    ).populate("job");

    if (!application) {
      return {
        success: false,
        error: "Application not found",
      };
    }

    // // Make sure this recruiter owns the job
    // if (
    //   application.job.recruiter.toString() !== userId
    // ) {
    //   return {
    //     success: false,
    //     error: "You are not authorized to update this application",
    //   };
    // }

    application.status = status;

    await application.save();

    return {
      success: true,
      applicationId: application._id.toString(),
      status: application.status,
    };
  } catch (error) {
    console.error(
      "Failed to update application status:",
      error
    );

    return {
      success: false,
      error:
        error.message ||
        "Failed to update application status",
    };
  }
};
export const fetchUserResume = async (userId) => {
  try {
    await connectDb();
    if (!userId) {
      return {
        success: false, error: "User not authenticated",
      };
    }
    const user = await User.findById(userId).select("resume").lean();
    if (!user) {
      return { success: false, error: "User not found", };
    } if (!user.resume) { return { success: false, error: "No resume uploaded", }; } return { success: true, resume: user.resume, };
  } catch (error) { console.error("Failed to fetch resume:", error); return { success: false, error: error.message || "Failed to fetch resume", }; }
};

export const reviewResume = async (userId) => {
  try {
    await connectDb();
    if (!userId) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userId).select("resume").lean();
    if (!user) {
      return {
        success: false, error: "User not found",
      };
    } if (!user.resume) {
      return {
        success: false, error: "Please upload a resume first",
      };
    }
    const prompt = ` You are an AI resume review assistant. 
          Analyze the provided resume and give the student useful feedback.
           Do not make a hiring, rejection, or shortlist decision. 
           Do not infer protected or sensitive characteristics. 
           Return the review using these sections: 
           1. Candidate Summary 
           2. Relevant Skills 
           3. Experience and Projects 
           4. Strengths 
           5. Missing or Weak Areas 
           6. Resume Improvement Suggestions 
           7. Suggested Interview Questions Only use information present in the resume. 
           Clearly say when information is not present. 
           Keep the review concise and practical. `;
    const response = await gemini.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: [
        createPartFromUri(
          user.resume, 
          "application/pdf"),
        prompt,
      ],
    }); return {
      success: true,
      review: response.text,
    };
  } catch (error) {
    console.error("AI resume review failed:", error);
    return { success: false, error: error.message || "Failed to review resume", };
  }
};