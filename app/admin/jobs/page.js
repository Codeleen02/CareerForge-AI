"use client";

import {
  Briefcase,
  Eye,
  Trash2,
  Flag,
} from "lucide-react";

import AdminSidebar from "@/Components/admin/AdminSidebar";


const JobsPage = () => {

  const jobs = [

    {
      title: "Frontend Developer Intern",
      company: "TechCorp",
      applicants: 32,
      status: "Active",
    },

    {
      title: "Backend Developer",
      company: "StartupX",
      applicants: 48,
      status: "Active",
    },

    {
      title: "Fake Work From Home Job",
      company: "Unknown Company",
      applicants: 2,
      status: "Reported",
    },

  ];


  return (

    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />


      <main className="lg:ml-64">

        <div className="p-6 md:p-8">


          <h1 className="text-3xl font-bold">
            Jobs Management
          </h1>

          <p className="mt-2 text-slate-500">
            Review and moderate jobs posted on CareerForge AI.
          </p>


          <div className="mt-8 space-y-4">

            {jobs.map((job, index) => (

              <div
                key={index}
                className="rounded-xl border bg-white p-6"
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

                      <h2 className="font-bold">
                        {job.title}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {job.company}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {job.applicants} Applicants
                      </p>

                    </div>

                  </div>


                  <span
                    className={`h-fit rounded-full px-4 py-2 text-sm font-semibold ${
                      job.status === "Reported"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {job.status}
                  </span>

                </div>


                <div className="mt-5 flex gap-2 border-t pt-5">

                  <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">

                    <Eye size={16} />

                    View

                  </button>


                  <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-orange-500">

                    <Flag size={16} />

                    Review

                  </button>


                  <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-red-500">

                    <Trash2 size={16} />

                    Remove Job

                  </button>

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