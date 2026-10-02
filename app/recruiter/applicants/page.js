"use client";

import {
  Search,
  FileText,
  Check,
  X,
  Eye,
} from "lucide-react";

import RecruiterSidebar from "@/Components/recruiter/RecruiterSidebar";
import { fetchapplicants, updateApplicationStatus } from "@/actions/Applicationaction";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const ApplicantsPage = () => {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const { data: session, status } = useSession();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const onSubmit = (data) => {
    console.log("Search:", data.search);
  };

  useEffect(() => {
    const getApplicants = async () => {
      try {
        if (!session?.user?.id) {
          return;
        }

        const applicantsdata = await fetchapplicants(
          session.user.id
        );

        console.log("Returned applicants:", applicantsdata);

        if (applicantsdata?.success) {
          setApplicants(applicantsdata.applicants || []);
        } else {
          setApplicants([]);
          console.error(applicantsdata?.error);
        }
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
        setApplicants([]);
      } finally {
        setLoading(false);
      }
    };

    if (
      status === "authenticated"
    ) {
      getApplicants();
    }
  }, [
    status,
    session?.user?.id,
    session?.user?.role,
  ]);
  const handleApplicationStatus = async (
    applicationId,
    status
  ) => {
    try {
      if (!session?.user?.id) {
        return;
      }

      const result = await updateApplicationStatus(
        applicationId,
        session.user.id,
        status
      );

      if (!result?.success) {
        console.error(result?.error);
        return;
      }

      setApplicants((currentApplicants) =>
        currentApplicants.map((applicant) =>
          applicant._id === applicationId
            ? {
              ...applicant,
              status: result.status,
            }
            : applicant
        )
      );
    } catch (error) {
      console.error(
        "Failed to update application status:",
        error
      );
    }
  };
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <RecruiterSidebar />

        <main className="lg:ml-64">
          <div className="p-6 md:p-8">
            <p className="text-slate-500">
              Loading applicants...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <RecruiterSidebar />

      <main className="lg:ml-64">

        <div className="p-6 md:p-8">

          <h1 className="text-3xl font-bold">
            Applicants
          </h1>

          <p className="mt-2 text-slate-500">
            Review and manage candidates who applied to your jobs.
          </p>

          {/* Search */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative mt-8 max-w-md"
          >
            <Search
              size={19}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search applicants..."
              {...register("search")}
              className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 outline-none focus:border-green-500"
            />
          </form>

          {/* Applicants */}

          <div className="mt-6 space-y-4">

            {applicants.length === 0 ? (
              <p className="text-slate-500">
                No applicants found.
              </p>
            ) : (
              applicants.map((applicant) => (
                <div
                  key={applicant._id}
                  className="rounded-xl border bg-white p-6"
                >

                  <div className="flex flex-col justify-between gap-5 lg:flex-row">

                    {/* Candidate */}

                    <div className="flex gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">

                        {applicant.student?.name?.charAt(0) || "?"}

                      </div>

                      <div>

                        <h2 className="font-bold">
                          {applicant.student?.name || "Unknown applicant"}
                        </h2>

                        <p className="text-sm text-slate-500">
                          {applicant.student?.email || "No email"}
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          Applied for:{" "}
                          {applicant.job?.title || "Unknown job"}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          Skills:{" "}
                          {applicant.student?.skills?.join(", ") ||
                            "Not provided"}
                        </p>

                      </div>

                    </div>

                    {/* Status */}

                    <span
                      className={`h-fit rounded-full px-4 py-2 text-sm font-semibold ${applicant.status === "shortlisted"
                        ? "bg-green-100 text-green-700"
                        : applicant.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {applicant.status === "applied"
                        ? "Under Review"
                        : applicant.status}
                    </span>

                  </div>

                  {/* Actions */}

                  <div className="mt-5 flex flex-wrap gap-2 border-t pt-5">

                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-slate-50"
                    >
                      <Eye size={16} />
                      View Profile
                    </button>

                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-slate-50"
                    >
                      <FileText size={16} />
                      View Resume
                    </button>

                    <button onClick={() =>
                      handleApplicationStatus(
                        applicant._id,
                        "shortlisted"
                      )
                    }
                      type="button"
                      className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
                    >
                      <Check size={16} />
                      Shortlist
                    </button>

                    <button onClick={() =>
                      handleApplicationStatus(
                        applicant._id,
                        "rejected"
                      )
                    }
                      type="button"
                      className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                    >
                      <X size={16} />
                      Reject
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>

      </main>
    </div>
  );
};

export default ApplicantsPage;

