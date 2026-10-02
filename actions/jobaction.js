"use server"
import Job from "@/models/Job"
import connectDb from "@/db/connectDb"

export const createJob = async (data, userId) => {
  try {
    await connectDb();

    if (!userId) {
      return {
        error: "User not authenticated",
      };
    }

    const skillsString = data.get("skills");

    const skills = skillsString
      ? skillsString
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
      : [];
const responsibilitiesString = data.get("responsibilities");

  const responsibilities = responsibilitiesString
      ? responsibilitiesString
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

       const requirementsString = data.get("requirements");

        const requirements = requirementsString
      ? requirementsString
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

       const benefitsString = data.get("benefits");

    const benefits = benefitsString
      ? benefitsString
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
const applicationDeadline = data.get("applicationDeadline");

const isActive = new Date(applicationDeadline) > new Date();
    const job = await Job.create({
      title: data.get("title"),
      location: data.get("location"),
      jobType: data.get("jobType"),
      workMode: data.get("workMode"),
       salary: {
        min: data.get("salaryMin")
          ? Number(data.get("salaryMin"))
          : undefined,
        max: data.get("salaryMax")
          ? Number(data.get("salaryMax"))
          : undefined,
      },
      skills,
      experience: data.get("experience"),
      description: data.get("description"),
      applicationDeadline: data.get("applicationDeadline"),
     isActive: new Date(applicationDeadline) > new Date() ? true : false,
       openings: data.get("openings")
        ? Number(data.get("openings"))
        : undefined,
      responsibilities: data.get("responsibilities"),
      requirements: data.get("requirements"),
      benefits: data.get("benefits"),

      // User who created this job
      recruiter: userId,
      //   company: companyId,
    });

    return {
      success: true,
      jobId: job._id.toString(),
    };

  } catch (error) {
    console.error("Create job error:", error);

    return {
      error: error.message || "Failed to create job",
    };
  }
};

export const updateJob = async (data, jobId,userId) => {
  try {
    await connectDb();
    if (!jobId) {
      return { error: "Job ID is required", };
    } if (!userId) {
      return {
        error: "User not authenticated",
      };
    }
    const currentJob = await Job.findById(jobId);
    if (!currentJob) {
      return {
        error: "Job not found",
      };
    }
    if (currentJob.recruiter.toString() !== userId) {
      return {
        error: "You are not authorized to update this job",
      };
    }
    const applicationDeadline = data.get("applicationDeadline");

const isActive = new Date(applicationDeadline) > new Date();
    const skillsString = data.get("skills")
    const skills = skillsString ? skillsString
    .split(",")
    .map((skill)=>skill.trim())
    .filter(Boolean)
    :[];
  const responsibilitiesString = data.get("responsibilities");

    const responsibilities = responsibilitiesString
      ? responsibilitiesString
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    const requirementsString = data.get("requirements");

    const requirements = requirementsString
      ? requirementsString
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
       const benefitsString = data.get("benefits");

    const benefits = benefitsString
      ? benefitsString
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    const updatedData = { title: data.get("title"), location: data.get("location"), jobType: data.get("jobType"), workMode: data.get("workMode"), salary: {
        min: data.get("salaryMin")
          ? Number(data.get("salaryMin"))
          : undefined,
        max: data.get("salaryMax")
          ? Number(data.get("salaryMax"))
          : undefined,
      }, skills, experience: data.get("experience"), description: data.get("description"),  applicationDeadline: data.get("applicationDeadline")
        ? new Date(data.get("applicationDeadline"))
        : undefined, isActive:new Date(applicationDeadline) > new Date(), openings: data.get("openings")
        ? Number(data.get("openings"))
        : undefined, responsibilities, requirements, benefits,
     };
     await Job.findByIdAndUpdate( 
      jobId, updatedData, 
      { new: true,
         runValidators: true,
         } 
        );
        return{
        
           success: true, 
        };
       } catch (error) { 
        console.error("Update job error:", error); 
        return { 
          error: error.message || "Failed to update job",
         };
  }
}
export const deleteJob = async (jobId, userId) => {
  try {
    await connectDb();

    if (!jobId) {
      return {
        error: "Job ID is required",
      };
    }

    if (!userId) {
      return {
        error: "User not authenticated",
      };
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return {
        error: "Job not found",
      };
    }

    // Only the recruiter who created the job can delete it
    if (job.recruiter.toString() !== userId.toString()) {
      return {
        error: "You are not authorized to delete this job",
      };
    }

    await Job.findByIdAndDelete(jobId);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete job error:", error);

    return {
      error: error.message || "Failed to delete job",
    };
  }
};
export const fetchRecruiterjobs = async (userId) => {
  try {
    await connectDb();

    if (!userId) {
      return [];
    }

    const jobs = await Job.find({
      recruiter: userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(jobs));
  } catch (error) {
    console.error("Fetch recruiter jobs error:", error);

    return [];
  }
};
export const getJobById = async (jobId, userId) => {
  try {
    await connectDb();

    if (!jobId) {
      return {
        error: "Job ID is required",
      };
    }

    if (!userId) {
      return {
        error: "User not authenticated",
      };
    }

    const job = await Job.findById(jobId).lean();

    if (!job) {
      return {
        error: "Job not found",
      };
    }

    // Make sure recruiter can only view their own job
    if (job.recruiter.toString() !== userId.toString()) {
      return {
        error: "You are not authorized to view this job",
      };
    }

    return {
      success: true,
      job: JSON.parse(JSON.stringify(job)),
    };
  } catch (error) {
    console.error("Get job error:", error);

    return {
      error: error.message || "Failed to get job",
    };
  }
};

export const fetchAvailableJobs = async ()=>{
try{
  await connectDb();
   const jobs = await Job.find({
    isActive:true
   }).sort({createdAt:-1}).lean()
   return JSON.parse(JSON.stringify(jobs))
}catch(error){
  console.error("Cannot fetch Available Jobs",error)
  return[]
}
}

export const fetchjobfromAvailableJobs = async (jobId) =>{
  try{
    await connectDb();
    if(!jobId){
      return {
        error:("jobid is required sonion")
      }
    };
  
    const job = await Job.findById(jobId).lean()
    if(!job){
      return{
      error:("Job not found")
    }
  }
    return{
      success:true,
     job:JSON.parse(JSON.stringify(job))
    }
  } catch(error){
    console.error("Get job error",error)
     return {
      error: error.message || "Failed to get job",
    };
  }
}



