"use client";

import Link from "next/link";

import {
  Plus,
  Briefcase,
  Users,
  MapPin,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

import { fetchRecruiterjobs, deleteJob } from "@/actions/jobaction";
import RecruiterSidebar from "@/Components/recruiter/RecruiterSidebar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const JobsPage = () => {
  const { data: session, status } = useSession();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getjobs = async () => {
      if (!session?.user?.id) {
        console.log("No session user ID");
        return;
      }

      console.log("Session user ID:", session.user.id);

      try {
        const jobsData = await fetchRecruiterjobs(session.user.id);

        console.log("Returned jobs:", jobsData);

        setJobs(jobsData);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    getjobs();
  }, [session?.user?.id]);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) {
      return;
    }

    if (!session?.user?.id) {
      alert("You are not authenticated");
      return;
    }

    try {
      const result = await deleteJob(
        jobId,
        session.user.id
      );

      if (result.error) {
        alert(result.error);
        return;
      }

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );

      alert("Job deleted successfully");
    } catch (error) {
      console.error("Delete job error:", error);
      alert("Failed to delete job");
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <RecruiterSidebar />

      <main className="lg:ml-64">
        <div className="p-6 md:p-8">

          {/* Header */}

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>
              <h1 className="text-3xl font-bold">
                My jobs
              </h1>

              <p className="mt-2 text-slate-500">
                Manage the jobs and internships posted by your company.
              </p>
            </div>

            <Link
              href="/recruiter/jobs/create"
              className="flex w-fit items-center gap-2 rounded-lg bg-green-500 px-5 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              <Plus size={19} />
              Post a job
            </Link>

          </div>

          {/* Jobs Cards */}

          <div className="mt-8 space-y-4">

            {jobs.map((job) => {

              // Check both manual status and application deadline
              const isJobActive =
                job.isActive &&
                (
                  !job.applicationDeadline ||
                  new Date(job.applicationDeadline) > new Date()
                );

              return (
                <div
                  key={job._id}
                  className="rounded-xl border bg-white p-6"
                >

                  <div className="flex flex-col justify-between gap-5 md:flex-row">

                    {/* Job Information */}

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

                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">

                          <span className="flex items-center gap-1">
                            <MapPin size={15} />
                            {job.location}
                          </span>

                          <span>
                            {job.jobType}
                          </span>

                          <span>
                            Posted{" "}
                            {job.createdAt &&
                              !isNaN(new Date(job.createdAt).getTime())
                              ? new Date(job.createdAt).toLocaleDateString()
                              : "Date unavailable"}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Status */}

                    <span
                      className={`h-fit rounded-full px-4 py-1 text-sm font-semibold ${isJobActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {isJobActive ? "Active" : "Closed"}
                    </span>

                  </div>

                  {/* Bottom */}

                  <div className="mt-6 flex flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:items-center">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <Users size={18} />

                      <span>
                        {job.openings} Openings
                      </span>
                    </div>

                    <div className="flex gap-2">

                      <Link
                        href={`/recruiter/jobs/${job._id}`}
                        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
                      >
                        <Eye size={16} />
                        View
                      </Link>

                      <Link
                        href={`/recruiter/jobs/${job._id}/edit`}
                        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
                      >
                        <Edit size={16} />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(job._id)}
                        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </main>
    </div>
  );
};

export default JobsPage;

