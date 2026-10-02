"use client";

import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Trash2,
} from "lucide-react";

import StudentSidebar from "@/Components/student/StudentSidebar";
import { fetchsavedjobs, removeSavedJob } from "@/actions/savedaction";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    const getjobs = async () => {
      try {
        if (!session?.user?.id) return;

        const jobsdata = await fetchsavedjobs(session.user.id);

        console.log("Returned Jobs", jobsdata?.jobs);

        if (jobsdata?.success) {
          setSavedJobs(jobsdata.jobs);
        }
      } catch (error) {
        console.error("Failed to fetch the saved jobs", error);
        setSavedJobs([]);
      }
    };

    getjobs();
  }, [session?.user?.id]);
  const handleRemoveSavedJob = async (jobId) => {
    try {
      const result = await removeSavedJob(
        jobId,
        session.user.id
      );

      if (result?.success) {
        console.log("Job removed!");

        setSavedJobs((currentJobs) =>
          currentJobs.filter((job) => job._id !== jobId)
        );
      } else {
        console.log(result?.error);
      }
    } catch (error) {
      console.error("Failed to remove saved job:", error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="lg:ml-64">
        <div className="p-6 md:p-8">

          <h1 className="text-3xl font-bold">
            Saved Jobs
          </h1>

          <p className="mt-2 text-slate-500">
            Jobs you've saved for later.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            {savedJobs.length === 0 ? (
              <p className="text-slate-500">
                No saved jobs found.
              </p>
            ) : (
              savedJobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-xl border bg-white p-6"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex gap-4">

                      <div className="rounded-lg bg-green-100 p-3">
                        <Briefcase
                          size={22}
                          className="text-green-600"
                        />
                      </div>

                      <div>

                        <h2 className="font-bold">
                          {job.title}
                        </h2>

                        <p className="text-sm text-slate-500">
                          {job.company || "Company not specified"}
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() => handleRemoveSavedJob(job._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={19} />
                    </button>

                  </div>

                  <div className="mt-5 flex gap-4 text-sm text-slate-500">

                    <span className="flex items-center gap-1">
                      <MapPin size={15} />
                      {job.location}
                    </span>

                    <span>
                      {job.jobType}
                    </span>

                  </div>

                  <Link
                    href={`/student/jobs/${job._id}`}
                    className="mt-5 block rounded-lg bg-green-500 py-2.5 text-center font-semibold text-white hover:bg-green-600"
                  >
                    View Job
                  </Link>

                </div>
              ))
            )}

          </div>

        </div>
      </main>
    </div>
  );
};

export default SavedJobs;