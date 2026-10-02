"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  getJobById,
  updateJob,
} from "@/actions/jobaction";

import { ToastContainer, toast } from "react-toastify";

import {
  useForm,
  useFieldArray,
} from "react-hook-form";

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

const EditJobPage = () => {
  const params = useParams();
  const router = useRouter();

  const { data: session, status } = useSession();

  const {
    register,
    control,
    reset,
    handleSubmit,
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

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "skills",
  });

  /*
   * Load existing job
   */
  useEffect(() => {
    const loadJob = async () => {
      if (
        status !== "authenticated" ||
        !session?.user?.id ||
        !params?.id
      ) {
        return;
      }

      try {
        const result = await getJobById(
          params.id,
          session.user.id
        );

        if (result?.error) {
          toast.error(result.error);
          return;
        }

        const job = result.job;

        const skills = (job.skills || []).map(
          (skill) => ({
            name: skill,
          })
        );

        const responsibilities =
          (job.responsibilities || []).join("\n");

        const requirements =
          (job.requirements || []).join("\n");

        const benefits =
          (job.benefits || []).join("\n");

        let applicationDeadline = "";

        if (job.applicationDeadline) {
          const date = new Date(
            job.applicationDeadline
          );

          if (!isNaN(date.getTime())) {
            applicationDeadline = date
              .toISOString()
              .split("T")[0];
          }
        }

        reset({
          title: job.title || "",
          jobType: job.jobType || "",
          experience: job.experience || "",
          location: job.location || "",
          workMode: job.workMode || "",

          salary:
            job.salary?.min ??
            job.salary?.max ??
            "",

          openings: job.openings || "",

          applicationDeadline,

          skills,

          description: job.description || "",

          responsibilities,

          requirements,

          benefits,
        });

      } catch (error) {
        console.error(
          "Load job error:",
          error
        );

        toast.error(
          "Failed to load job"
        );
      }
    };

    loadJob();
  }, [
    params?.id,
    session?.user?.id,
    status,
    reset,
  ]);

  /*
   * Submit updated job
   */
  const onSubmit = async (data) => {
    try {
      if (!session?.user?.id) {
        toast.error(
          "User not authenticated"
        );

        return;
      }

      if (!params?.id) {
        toast.error(
          "Job ID is missing"
        );

        return;
      }

      const formData = new FormData();

      formData.append(
        "title",
        data.title
      );

      formData.append(
        "location",
        data.location
      );

      formData.append(
        "jobType",
        data.jobType
      );

      formData.append(
        "workMode",
        data.workMode
      );

      formData.append("salaryMin", data.salaryMin);
      formData.append("salaryMax", data.salaryMax);

      formData.append(
        "openings",
        data.openings
      );

      formData.append(
        "experience",
        data.experience
      );

      formData.append(
        "description",
        data.description
      );

      formData.append(
        "applicationDeadline",
        data.applicationDeadline
      );

      const skillsString = data.skills
        .map((skill) => skill.name)
        .join(", ");

      formData.append(
        "skills",
        skillsString
      );

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

      const result = await updateJob(
        formData,
        params.id,
        session.user.id
      );

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        "Job updated successfully!"
      );

      /*
       * Go back to jobs list
       */
      setTimeout(() => {
        router.push(
          "/recruiter/jobs"
        );

        router.refresh();
      }, 1000);

    } catch (error) {
      console.error(
        "Update job error:",
        error
      );

      toast.error(
        "Failed to update job"
      );
    }
  };

  /*
   * Add skill
   */
  const addSkill = () => {
    const input =
      document.getElementById(
        "skillInput"
      );

    if (!input) return;

    const skill =
      input.value.trim();

    if (!skill) return;

    const alreadyExists =
      fields.some(
        (field) =>
          field.name.toLowerCase() ===
          skill.toLowerCase()
      );

    if (alreadyExists) {
      toast.warning(
        "Skill already added"
      );

      return;
    }

    append({
      name: skill,
    });

    input.value = "";
  };

  /*
   * Loading state
   */
  if (
    status === "loading"
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

      <main className="lg:ml-64">

        <div className="p-6 md:p-8">

          {/* Back */}

          <Link
            href="/recruiter/jobs"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-green-600"
          >
            <ArrowLeft size={18} />

            Back to Jobs
          </Link>

          {/* Header */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-slate-900">
              Edit Job
            </h1>

            <p className="mt-2 text-slate-500">
              Update the details of your job
              or internship opportunity.
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="max-w-5xl"
          >

            {/* BASIC INFORMATION */}

            <div className="rounded-xl border bg-white p-6 md:p-8">

              <div className="mb-6">

                <h2 className="text-xl font-bold text-slate-900">
                  Basic Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the basic details
                  about the job.
                </p>

              </div>

              {/* Title */}

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
                    {...register(
                      "title",
                      {
                        required:
                          "Job title is required",
                      }
                    )}
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 outline-none transition focus:border-green-500"
                  />

                </div>

                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}

              </div>

              {/* Job type + experience */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Job Type
                  </label>

                  <select
                    {...register(
                      "jobType",
                      {
                        required:
                          "Job type is required",
                      }
                    )}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-500"
                  >

                    <option value="">
                      Select job type
                    </option>

                    <option value="internship">
                      Internship
                    </option>

                    <option value="full-time">
                      Full-Time
                    </option>

                    <option value="part time">
                      Part-Time
                    </option>

                    <option value="contract">
                      Contract
                    </option>

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
                    {...register(
                      "experience",
                      {
                        required:
                          "Experience level is required",
                      }
                    )}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-500"
                  >

                    <option value="">
                      Select experience
                    </option>

                    <option value="fresher">
                      Fresher
                    </option>

                    <option value="entry">
                      Entry Level
                    </option>

                    <option value="mid">
                      Mid Level
                    </option>

                    <option value="senior">
                      Senior Level
                    </option>

                  </select>

                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.experience.message}
                    </p>
                  )}

                </div>

              </div>

              {/* Location + work mode */}

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
                      {...register(
                        "location",
                        {
                          required:
                            "Location is required",
                        }
                      )}
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
                    {...register(
                      "workMode",
                      {
                        required:
                          "Work mode is required",
                      }
                    )}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-500"
                  >

                    <option value="">
                      Select work mode
                    </option>

                    <option value="remote">
                      Remote
                    </option>

                    <option value="onsite">
                      On-site
                    </option>

                    <option value="hybrid">
                      Hybrid
                    </option>

                  </select>

                  {errors.workMode && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.workMode.message}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* COMPENSATION */}

            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">

              <h2 className="text-xl font-bold">
                Compensation & Openings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update salary and opening details.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-3">

                {/* Salary */}
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
                      {...register(
                        "openings",
                        {
                          required:
                            "Number of openings is required",
                          valueAsNumber: true,
                          min: {
                            value: 1,
                            message:
                              "At least 1 opening is required",
                          },
                        }
                      )}
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
                      {...register(
                        "applicationDeadline",
                        {
                          required:
                            "Application deadline is required",
                        }
                      )}
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 outline-none focus:border-green-500"
                    />

                  </div>

                  {errors.applicationDeadline && (
                    <p className="mt-1 text-sm text-red-500">
                      {
                        errors
                          .applicationDeadline
                          .message
                      }
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* SKILLS */}

            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">

              <h2 className="text-xl font-bold">
                Required Skills
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the skills required for this position.
              </p>

              <div className="mt-6 flex gap-3">

                <input
                  type="text"
                  placeholder="e.g. React.js"
                  id="skillInput"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-500"
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter"
                    ) {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={addSkill}
                  className="flex items-center gap-2 rounded-lg bg-slate-800 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-700"
                >
                  <Plus size={18} />

                  Add
                </button>

              </div>

              <div className="mt-4 flex flex-wrap gap-2">

                {fields.map(
                  (field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700"
                    >

                      {field.name}

                      <button
                        type="button"
                        onClick={() =>
                          remove(index)
                        }
                        className="transition hover:text-red-500"
                      >
                        <X size={15} />
                      </button>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">

              <h2 className="text-xl font-bold">
                Job Description
              </h2>

              <textarea
                rows={7}
                {...register(
                  "description",
                  {
                    required:
                      "Job description is required",
                  }
                )}
                className="mt-6 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
              />

              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {
                    errors.description
                      .message
                  }
                </p>
              )}

            </div>

            {/* RESPONSIBILITIES */}

            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">

              <h2 className="text-xl font-bold">
                Responsibilities
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                One responsibility per line.
              </p>

              <textarea
                rows={6}
                {...register(
                  "responsibilities",
                  {
                    required:
                      "Responsibilities are required",
                  }
                )}
                className="mt-6 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
              />

              {errors.responsibilities && (
                <p className="mt-1 text-sm text-red-500">
                  {
                    errors
                      .responsibilities
                      .message
                  }
                </p>
              )}

            </div>

            {/* REQUIREMENTS */}

            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">

              <h2 className="text-xl font-bold">
                Requirements
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                One requirement per line.
              </p>

              <textarea
                rows={6}
                {...register(
                  "requirements",
                  {
                    required:
                      "Requirements are required",
                  }
                )}
                className="mt-6 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
              />

              {errors.requirements && (
                <p className="mt-1 text-sm text-red-500">
                  {
                    errors.requirements
                      .message
                  }
                </p>
              )}

            </div>

            {/* BENEFITS */}

            <div className="mt-6 rounded-xl border bg-white p-6 md:p-8">

              <h2 className="text-xl font-bold">
                Benefits
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                One benefit per line.
              </p>

              <textarea
                rows={5}
                {...register(
                  "benefits"
                )}
                className="mt-6 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
              />

            </div>

            {/* BUTTONS */}

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
                Update Job
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
};

export default EditJobPage;