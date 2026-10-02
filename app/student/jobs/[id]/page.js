"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Users,
  Calendar,
  Clock,
} from "lucide-react";

import StudentSidebar from "@/Components/student/StudentSidebar";
import { useEffect, useState } from "react";
import { fetchjobfromAvailableJobs } from "@/actions/jobaction";
import { useParams } from "next/navigation";
const JobViewPage = () => {
  const params = useParams();
  const jobId = params.id;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getjobs = async () => {
      try {
        const jobsdata = await fetchjobfromAvailableJobs(jobId);

        console.log("Returned data", jobsdata);

        if (jobsdata?.success) {
          setJob(jobsdata.job);
        }
        
      } catch (error) {
        console.error("failed to fetch jobs", error)
        setJob(null);
      } finally {
        setLoading(false);
      }
    }
    if (jobId) {
      getjobs();
    }
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <StudentSidebar />

        <main className="lg:ml-64">
          <div className="p-6 md:p-8">
            <p className="text-slate-500">Loading job...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50">
        <StudentSidebar />

        <main className="lg:ml-64">
          <div className="p-6 md:p-8">
            <Link
              href="/student/jobs"
              className="mb-6 flex w-fit items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Back to jobs
            </Link>

            <div className="rounded-xl border bg-white p-8">
              <h1 className="text-xl font-bold">
                Job not found
              </h1>

              <p className="mt-2 text-slate-500">
                This job may have been deleted or does not exist.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const isJobActive =
    job.isActive &&
    (
      !job.applicationDeadline ||
      new Date(job.applicationDeadline) > new Date()
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="lg:ml-64">
        <div className="p-6 md:p-8">

          {/* Back Button */}

          <Link
            href="/student/jobs"
            className="mb-6 flex w-fit items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to jobs
          </Link>

          <div className="rounded-xl border bg-white p-6 md:p-8">

            <div className="flex flex-col justify-between gap-6 md:flex-row">

              <div className="flex gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  <Briefcase
                    size={26}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold md:text-3xl">
                    {job.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">

                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {job.jobType}
                    </span>

                  </div>
                </div>

              </div>

              {/* Status */}

              <span
                className={`h-fit w-fit rounded-full px-4 py-1.5 text-sm font-semibold ${isJobActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {isJobActive ? "Active" : "Closed"}
              </span>

            </div>

            {/* Job Stats */}

            <div className="mt-8 grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-3">

              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Users size={17} />
                  Openings
                </div>

                <p className="mt-1 text-lg font-bold">
                  {job.openings}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar size={17} />
                  Posted
                </div>

                <p className="mt-1 text-lg font-bold">
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock size={17} />
                  Deadline
                </div>

                <p className="mt-1 text-lg font-bold">
                  {job.applicationDeadline
                    ? new Date(
                      job.applicationDeadline
                    ).toLocaleDateString()
                    : "No deadline"}
                </p>
              </div>

            </div>

          </div>

          {/* Job Description */}

          <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">

            <h2 className="text-xl font-bold">
              Job Description
            </h2>

            <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
              {job.description || "No description provided."}
            </p>

          </div>

          {/* Requirements */}

          <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">

            <h2 className="text-xl font-bold">
              Requirements
            </h2>

            <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
              {job.requirements || "No requirements provided."}
            </p>

          </div>

          {/* Skills */}

          {job.skills && job.skills.length > 0 && (
            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">

              <h2 className="text-xl font-bold">
                Skills
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">

                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700"
                  >
                    {typeof skill === "string"
                      ? skill
                      : skill.name}
                  </span>
                ))}

              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default JobViewPage;

