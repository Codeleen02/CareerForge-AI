"use server";

import SavedJob from "@/models/SavedJob";
import Job from "@/models/Job";
import connectDb from "@/db/connectDb";

export const savejob = async (jobId, userId) => {
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
   
    const savedJob = await SavedJob.create({
      student: userId,
      job: jobId,
    });

    return {
      success: true,
      savedJobId: savedJob._id.toString(),
    };
  } catch (error) {
    if (error.code === 11000) {
      return {
        success: false,
        error: "Job already saved",
      };
    }

    console.error("Failed to save job:", error);

    return {
      success: false,
      error: error.message || "Failed to save job",
    };
  }
};

export const fetchsavedjobs = async (userId) => {
  try {
    await connectDb();

    if (!userId) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const savedJobs = await SavedJob.find({
      student: userId,
    }).lean();

    if (savedJobs.length === 0) {
      return {
        success: true,
        jobs: [],
      };
    }

    const jobIds = savedJobs.map((savedJob) => savedJob.job);

    const jobs = await Job.find({
      _id: { $in: jobIds },
    }).lean();

    return {
      success: true,
      jobs: JSON.parse(JSON.stringify(jobs)),
    };
  } catch (error) {
    console.error("Failed to fetch saved jobs:", error);

    return {
      success: false,
      error: error.message || "Failed to fetch saved jobs",
    };
  }
};

export const removeSavedJob = async (jobId, userId) => {
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

    const deletedJob = await SavedJob.findOneAndDelete({
      student: userId,
      job: jobId,
    });

    if (!deletedJob) {
      return {
        success: false,
        error: "Saved job not found",
      };
    }

    return {
      success: true,
      message: "Job removed from saved jobs",
    };
  } catch (error) {
    console.error("Failed to remove saved job:", error);

    return {
      success: false,
      error: error.message || "Failed to remove saved job",
    };
  }
};