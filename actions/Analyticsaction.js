"use server";

import Job from "@/models/Job";
import Application from "@/models/Application";
import connectDb from "@/db/connectDb";

export const fetchAnalytics = async (recruiterId) => {
  try {
    await connectDb();

    if (!recruiterId) {
      return {
        success: false,
        error: "Recruiter ID is required",
      };
    }

    const jobs = await Job.find({
      recruiter: recruiterId,
    })
      .select("_id title isActive")
      .lean();

    const jobIds = jobs.map((job) => job._id);

    // Total jobs
    const totalJobs = jobs.length;

    // Active jobs
    const activeJobs = jobs.filter(
      (job) => job.isActive === true
    ).length;

    // Total applications across all recruiter's jobs
    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    // Applications still under review
    const totalApplied = await Application.countDocuments({
      job: { $in: jobIds },
      status: "applied",
    });

    // Shortlisted applications
    const totalShortlisted = await Application.countDocuments({
      job: { $in: jobIds },
      status: "shortlisted",
    });

    // Rejected applications
    const totalRejected = await Application.countDocuments({
      job: { $in: jobIds },
      status: "rejected",
    });

    return {
      success: true,
      analytics: {
        totalJobs,
        activeJobs,
        totalApplications,
        totalApplied,
        totalShortlisted,
        totalRejected,
      },
    };
  } catch (error) {
    console.error("Failed to fetch analytics:", error);

    return {
      success: false,
      error:
        error.message || "Failed to fetch recruiter analytics",
    };
  }
};

export const applyfilter = async (period) => {
  try {
    await connectDb();

    if (!period) {
      return {
        success: false,
        error: "Filter period is required",
      };
    }

    const now = new Date();

    const startDate = new Date(now)

    if (period === "7days") {
      startDate.setDate(now.getDate() - 7)
    }

    if (period === "30days") {
      startDate.setDate(now.getDate() - 30)
    }

    if (period === "3months") {
      startDate.setMonth(now.getMonth() - 3)
    }

    if (period === "6months") {
      startDate.setMonth(now.getMonth() - 6)
    }

    const applications = await Application.find({
      createdAt: {
        $gte: startDate,
        $lte: now,
      },
    }).lean()

    return {
      success: true,
      applications: JSON.parse(JSON.stringify(applications)),
    };

  } catch (error) {
    console.error("Failed to apply fetch filter", error)

    return {
      success: false,
      error: error.message || "Failed to fetch filtered applications",
    };
  }
}

export const recentjob = async () => {
  try {
    await connectDb()

    const job = await Job.findOne(
    ).sort({ createdAt: -1 });
    return {
      success: true,
      job: JSON.parse(JSON.stringify(job))
    };
  } catch (error) {
    console.error("Falied to fetch the recent job", error)

    return {
      success: false,
      error: "Failed to fetch the recent job",
    };
  }
}

export const ApplicationsOverview = async () => {
  try {
    await connectDb();

    const year = new Date().getFullYear();

    const startDate = new Date(year, 4, 1); // May 1
    const endDate = new Date(year, 9, 31, 23, 59, 59, 999); // Oct 31

    const periodApplications = await Application.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const maxApplication = Math.max(
      ...periodApplications.map((item) => item.total),
      0
    );

    const applicationsOverview = periodApplications.map((item) => ({
      month: item._id.month,
      total: item.total,
      percentage: maxApplication
        ? (item.total / maxApplication) * 100
        : 0,
    }));

    return {
      success: true,
      applicationsOverview,
      maxApplication,
    };
  } catch (error) {
    console.error("Failed to fetch applications overview:", error);

    return {
      success: false,
      error: "Failed to fetch applications overview",
    };
  }
};