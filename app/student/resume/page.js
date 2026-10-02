"use client";

import { FileText, Upload, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { uploadResume } from "@/actions/resumeactions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResumePage = () => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      resumeTitle: "",
      resume: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      if (!session?.user?.id) {
        console.error("User not authenticated");
        return;
      }

      const file = data.resume?.[0];

      console.log("CLIENT FILE:", file);

      if (!file) {
        console.error("No resume selected");
        return;
      }

      const formData = new FormData();
      formData.append("resume", file);

      const result = await uploadResume(
        formData,
        session.user.id
      );

      console.log("UPLOAD RESULT:", result);
      toast.success("File uploaded successfully")
    } catch (error) {
      console.error("Resume upload failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
    <ToastContainer
          position="top-right"
          autoClose={5000}
          theme="colored"
        />
  
      <main className="lg:ml-64">
        <div className="p-6 md:p-8">

          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              My Resume
            </h1>

            <p className="mt-2 text-slate-500">
              Upload your resume so recruiters can view it when you apply
              for jobs.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-3xl rounded-xl border bg-white p-6 md:p-8"
          >

            {/* Resume title */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Resume Title
              </label>

              <input
                type="text"
                placeholder="e.g. Rahul Sharma Resume"
                {...register("resumeTitle", {
                  required: "Resume title is required",
                })}
                className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
              />

              {errors.resumeTitle && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.resumeTitle.message}
                </p>
              )}
            </div>

            {/* Resume upload */}

            <div className="mt-6">

              <label className="mb-2 block text-sm font-semibold">
                Upload Resume
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition hover:bg-slate-50">

                <Upload
                  size={30}
                  className="mb-3 text-slate-400"
                />

                <span className="font-medium">
                  Choose your resume
                </span>

                <span className="mt-1 text-sm text-slate-500">
                  PDF recommended
                </span>


                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  {...register("resume", {
                    required: "Please upload your resume",
                  })}
                />
              </label>

              {errors.resume && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.resume.message}
                </p>
              )}

            </div>

            {/* Current user */}

            {session?.user?.name && (
              <div className="mt-6 flex items-center gap-3 rounded-lg bg-slate-50 p-4">

                <FileText size={20} className="text-slate-500" />

                <div>
                  <p className="text-sm font-medium">
                    Resume belongs to
                  </p>

                  <p className="text-sm text-slate-500">
                    {session.user.name}
                  </p>
                </div>

              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              className="mt-8 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              <Save size={18} />
              Save Resume
            </button>

          </form>

        </div>
      </main>

    </div>
  );
};

export default ResumePage;

