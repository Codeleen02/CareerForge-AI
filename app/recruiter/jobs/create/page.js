"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { createJob } from "@/actions/jobaction";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm, useFieldArray } from "react-hook-form";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  IndianRupee,
  Calendar,
  Users,
  Plus,
  X,
} from "lucide-react";

const CreateJobPage = () => {
  const {
    register,
    control,
    handleSubmit,
    resetProfile,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      jobType: "",
      experience: "",
      location: "",
      workMode: "",
      salaryMin: "",
      salaryMax: "",
      openings: "",
      applicationDeadline: "",
      skills: [],
      description: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });
  const { data: session, status } = useSession();

  useEffect(() => {

  }, [session, status, resetProfile]);
  const onSubmit = async (data) => {
    try {
      if (!session?.user?.id) {
        toast.error("Session missing or user not authenticated");
        return;
      }
      let formData = new FormData()
      formData.append("title", data.title);
      formData.append("location", data.location);
      formData.append("jobType", data.jobType);
      formData.append("workMode", data.workMode);
      formData.append("salaryMin", data.salaryMin);
      formData.append("salaryMax", data.salaryMax);
      formData.append("openings", data.openings);
      formData.append(
        "applicationDeadline",
        data.applicationDeadline
      );
      formData.append("experience", data.experience);
      formData.append("description", data.description);
      const skillsString = data.skills
        .map((skill) => skill.name)
        .join(", ");

      formData.append("skills", skillsString);

      formData.append(
        "responsibilities",
        data.responsibilities
      );

      formData.append(
        "requirements",
        data.requirements
      );

      formData.append(
        "benefits",
        data.benefits
      );
      const result = await createJob(formData, session.user.id);

      if (result?.error) {
        alert(result.error);
        return;
      }
      toast.success("Job Created successfully!");

    } catch (error) {

      console.error("Job Create error:", error);

      toast.error("Failed to Create Job");

    }

  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
      />
      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="p-6 md:p-8">
          {/* Back Button */}
          <Link
            href="/recruiter/jobs"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-green-600"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Create New Job
            </h1>

            <p className="mt-2 text-slate-500">
              Create a new job or internship opportunity for students.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl">
            {/* Basic Information */}
            <div className="rounded-xl border bg-white p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Basic Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Provide the basic details about the job.
                </p>
              </div>

              {/* Job Title */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold">
                  Job Title
                </label>

                <div className="relative">
                  <Briefcase
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="e.g. Frontend Developer Intern"
                    {...register("title", {
                      required: "Job title is required",
                    })}
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 outline-none transition focus:border-green-500"
                  />
                </div>

                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Job Type + Experience */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Job Type
                  </label>

                  <select
                    {...register("jobType", {
                      required: "Job type is required",
                    })}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-500"
                  >
                    <option value="">Select job type</option>
                    <option value="internship">Internship</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                  </select>

                  {errors.jobType && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.jobType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Experience level
                  </label>

                  <select
                    {...register("experience", {
                      required: "Experience level is required",
                    })}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-500"
                  >
                    <option value="">Select experience</option>
                    <option value="fresher">Fresher</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                  </select>

                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.experience.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Location + Work Mode */}
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Location
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="text"
                      placeholder="e.g. Mumbai, India"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 outline-none focus:border-green-500"
                    />
                  </div>

                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Work Mode
                  </label>

                  <select
                    {...register("workMode", {
                      required: "Work mode is required",
                    })}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-500"
                  >
                    <option value="">Select work mode</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>

                  {errors.workMode && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.workMode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Compensation */}
            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold">
                Compensation & Openings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Provide salary, stipend and opening details.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {/* Salary */}

<div className="md:col-span-2">
  <label className="mb-2 block text-sm font-semibold">
    Salary / Stipend
  </label>

  <div className="grid gap-4 sm:grid-cols-2">

    {/* Minimum Salary */}
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-500">
        Minimum
      </label>

      <div className="relative">
        <IndianRupee
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          type="number"
          placeholder="e.g. 15000"
          {...register("salaryMin", {
            required: "Minimum salary is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Salary cannot be negative",
            },
          })}
          className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 outline-none transition focus:border-green-500"
        />
      </div>

      {errors.salaryMin && (
        <p className="mt-1 text-sm text-red-500">
          {errors.salaryMin.message}
        </p>
      )}
    </div>

    {/* Maximum Salary */}
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-500">
        Maximum
      </label>

      <div className="relative">
        <IndianRupee
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          type="number"
          placeholder="e.g. 30000"
          {...register("salaryMax", {
            required: "Maximum salary is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Salary cannot be negative",
            },
          })}
          className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 outline-none transition focus:border-green-500"
        />
      </div>

      {errors.salaryMax && (
        <p className="mt-1 text-sm text-red-500">
          {errors.salaryMax.message}
        </p>
      )}
    </div>

  </div>
</div>
                {/* Openings */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Number of Openings
                  </label>

                  <div className="relative">
                    <Users
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="number"
                      placeholder="e.g. 5"
                      {...register("openings", {
                        required: "Number of openings is required",
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: "At least 1 opening is required",
                        },
                      })}
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 outline-none focus:border-green-500"
                    />
                  </div>

                  {errors.openings && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.openings.message}
                    </p>
                  )}
                </div>

                {/* Deadline */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Application Deadline
                  </label>

                  <div className="relative">
                    <Calendar
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="date"
                      {...register("applicationDeadline", {
                        required: "Application deadline is required",
                      })}
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 outline-none focus:border-green-500"
                    />
                  </div>

                  {errors.applicationDeadline && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.applicationDeadline.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold">
                Required Skills
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add the skills required for this position.
              </p>

              <div className="mt-6 flex gap-3">
                <input
                  type="text"
                  placeholder="e.g. React.js"
                  id="skillInput"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      const input = e.currentTarget;
                      const skill = input.value.trim();

                      if (skill) {
                        const alreadyExists = fields.some(
                          (field) => field.name.toLowerCase() === skill.toLowerCase()
                        );

                        if (!alreadyExists) {
                          append({ name: skill });
                          input.value = "";
                        }
                      }
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById("skillInput");
                    const skill = input.value.trim();

                    if (skill) {
                      const alreadyExists = fields.some(
                        (field) =>
                          field.name.toLowerCase() === skill.toLowerCase()
                      );

                      if (!alreadyExists) {
                        append({ name: skill });
                        input.value = "";
                      }
                    }
                  }}
                  className="flex items-center gap-2 rounded-lg bg-slate-800 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-700 active:scale-95"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>

              {/* Skills List */}
              <div className="mt-4 flex flex-wrap gap-2">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700"
                  >
                    {field.name}

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="transition hover:text-red-500"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold">
                Job Description
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Describe the role and what the candidate will be doing.
              </p>

              <textarea
                rows={7}
                placeholder="Write a detailed description of the job..."
                {...register("description", {
                  required: "Job description is required",
                })}
                className="mt-6 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
              />

              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Responsibilities */}
            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold">
                Responsibilities
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                List the main responsibilities of the candidate.
              </p>

              <textarea
                rows={6}
                placeholder={`Example:

Develop responsive web applications
Collaborate with the development team
Write clean and maintainable code
Participate in code reviews`}
                {...register("responsibilities", {
                  required: "Responsibilities are required",
                })}
                className="mt-6 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
              />

              {errors.responsibilities && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.responsibilities.message}
                </p>
              )}
            </div>

            {/* Requirements */}
            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold">
                Requirements
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                List the qualifications and requirements for applicants.
              </p>

              <textarea
                rows={6}
                placeholder={`Example:

Currently pursuing a Bachelor's degree
Knowledge of JavaScript and React
Good problem-solving skills
Strong communication skills`}
                {...register("requirements", {
                  required: "Requirements are required",
                })}
                className="mt-6 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
              />

              {errors.requirements && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.requirements.message}
                </p>
              )}
            </div>

            {/* Benefits */}
            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold">
                Benefits
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tell candidates what your company offers.
              </p>

              <textarea
                rows={5}
                placeholder={`Example:

Certificate upon completion
Flexible working hours
Work from home
Pre-placement opportunity`}
                {...register("benefits")}
                className="mt-6 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/recruiter/jobs"
                className="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold transition hover:bg-slate-100"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-green-500 px-8 py-3 font-semibold text-white transition hover:bg-green-600 active:scale-95"
              >
                Create Job
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateJobPage;

