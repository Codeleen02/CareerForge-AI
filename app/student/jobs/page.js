"use client";

import {
  Search,
  MapPin,
  Briefcase,
  Bookmark,
} from "lucide-react";

import Link from "next/link";
import StudentSidebar from "@/Components/student/StudentSidebar";
import { fetchAvailableJobs } from "@/actions/jobaction";
import { applyJob } from "@/actions/Applicationaction";
import { savejob } from "@/actions/savedaction";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const JobsPage = () => {
  const { register, watch } = useForm({
    defaultValues: {
      search: "",
      location: "",
      jobType: "",
    },

  });
  const { data: session } = useSession();
  const [Jobs, setJobs] = useState([])
  const searchValue = watch("search");
  const locationValue = watch("location")
  const jobTypeValue = watch("jobType")
  useEffect(() => {
    const getjobs = async () => {
      try {
        const jobsdata = await fetchAvailableJobs()
        console.log("Returned Jobs", jobsdata)
        setJobs(jobsdata)
      } catch (error) {
        console.error("Failed to fetch jobs", error)
      }
    }
    getjobs()
  }, [])
  const filteredJobs = Jobs.filter((job) =>
    job.title.toLowerCase().includes(searchValue.toLowerCase()) &&
    job.location.toLowerCase().includes(locationValue.toLowerCase())
    &&
    job.jobType.toLowerCase().includes(jobTypeValue.toLowerCase())
  );

  const handleSaveJob = async (jobId) => {
    try {
      const result = await savejob(jobId, session.user.id);

      if (result?.success) {
        console.log("Job saved!");
        toast.success("Job saved successfully")
      }
    } catch (error) {
      console.error("Failed to save job:", error);
    }
  };
 const handleApply = async (jobId) => {
  try {
    if (!session?.user?.id) {
      console.error("User not authenticated");
      return;
    }

    const result = await applyJob(jobId, session.user.id);

    if (result?.success) {
      console.log("Application submitted successfully!");
      toast.success("applied to job successfully")
    } else {
      console.error(result?.error);
    }
  } catch (error) {
    console.error("Failed to apply for job:", error);
  }
};
  return (
    <div className="min-h-screen bg-slate-50">
      <StudentSidebar />
 <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
      />

      <main className="lg:ml-64">
        <div className="p-6 md:p-8">

          {/* Header */}

          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Find Your Next Opportunity
            </h1>

            <p className="mt-2 text-slate-500">
              Discover internships and jobs that match your skills.
            </p>
          </div>


          {/* Search */}
          <div className="rounded-xl border bg-white p-5">

            <div className="grid gap-4 md:grid-cols-3">

              {/* Search */}

              <div className="relative">

                <Search
                  size={19}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search jobs..."
                  {...register("search")}
                  className="w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:border-green-500"
                />

              </div>


              {/* Location */}

              <div className="relative">

                <MapPin
                  size={19}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Location"
                  {...register("location")}
                  className="w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:border-green-500"
                />

              </div>


              {/* Job Type */}

              <select
                {...register("jobType")}
                className="rounded-lg border px-3 py-2.5 outline-none focus:border-green-500"
              >
                <option value="">
                  All Job Types
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Full-Time">
                  Full-Time
                </option>

                <option value="Remote">
                  Remote
                </option>
              </select>

            </div>

          </div>


          {/* Jobs */}

          <div className="mt-8 space-y-4">

            {filteredJobs.map((job) => (

              <div
                key={job._id}
                className="rounded-xl border bg-white p-6 transition hover:shadow-md"
              >

                <div className="flex flex-col justify-between gap-5 md:flex-row">

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">

                      <Briefcase
                        size={22}
                        className="text-green-600"
                      />

                    </div>


                    <div>

                      <h2 className="text-lg font-bold">
                        {job.title}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {job.company}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500">

                        <span className="flex items-center gap-1">
                          <MapPin size={15} />
                          {job.location}
                        </span>

                        <span>
                          {job.jobType
                          }
                        </span>

                        <span>
                          {job.salary.min}
                        </span>

                        <span>
                          {job.salary.max}
                        </span>
                      </div>

                    </div>

                  </div>


                  <div className="flex items-center gap-3">

                    <button onClick={() => handleSaveJob(job._id)}
                      type="button"
                      className="rounded-lg border p-2 transition hover:bg-green-50"
                    >
                      <Bookmark size={19} />
                    </button>


                    <Link
                      href={`/student/jobs/${job._id}`}
                      className="rounded-lg bg-green-500 px-5 py-2.5 font-semibold text-white transition hover:bg-green-600"
                    >
                      View Job
                    </Link>
                    <button onClick={() => handleApply(job._id)} className="rounded-lg bg-green-500 px-6 py-3 font-semibold text-white">Apply Now</button>
                  </div>

                </div>


                {/* Skills */}

                <div className="mt-5 flex flex-wrap gap-2">

                  {job.skills.map((skill) => (
                    <span key={skill}>
                      {skill}
                    </span>
                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>
      </main>

    </div>
  );
};

export default JobsPage;