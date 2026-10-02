"use client";

import {
  Building2,
  Eye,
  Trash2,
  Check,
  X,
} from "lucide-react";

import AdminSidebar from "@/Components/admin/AdminSidebar";


const RecruitersPage = () => {

  const recruiters = [

    {
      company: "TechCorp",
      recruiter: "Rahul Mehta",
      email: "rahul@techcorp.com",
      status: "Verified",
    },

    {
      company: "StartupX",
      recruiter: "Ankit Shah",
      email: "ankit@startupx.com",
      status: "Pending",
    },

    {
      company: "InnovateLabs",
      recruiter: "Neha Patel",
      email: "neha@innovatelabs.com",
      status: "Verified",
    },

  ];


  return (

    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />


      <main className="lg:ml-64">

        <div className="p-6 md:p-8">


          <h1 className="text-3xl font-bold">
            Recruiters
          </h1>

          <p className="mt-2 text-slate-500">
            Manage companies and recruiter accounts.
          </p>


          <div className="mt-8 space-y-4">

            {recruiters.map((recruiter, index) => (

              <div
                key={index}
                className="rounded-xl border bg-white p-6"
              >

                <div className="flex flex-col justify-between gap-5 md:flex-row">


                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">

                      <Building2
                        size={22}
                        className="text-green-600"
                      />

                    </div>


                    <div>

                      <h2 className="font-bold">
                        {recruiter.company}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {recruiter.recruiter}
                      </p>

                      <p className="text-sm text-slate-500">
                        {recruiter.email}
                      </p>

                    </div>

                  </div>


                  <span
                    className={`h-fit rounded-full px-4 py-2 text-sm font-semibold ${
                      recruiter.status === "Verified"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {recruiter.status}
                  </span>

                </div>


                <div className="mt-5 flex gap-2 border-t pt-5">

                  <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">

                    <Eye size={16} />

                    View

                  </button>


                  {recruiter.status === "Pending" && (

                    <>

                      <button className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm text-white">

                        <Check size={16} />

                        Verify

                      </button>

                      <button className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm text-white">

                        <X size={16} />

                        Reject

                      </button>

                    </>

                  )}


                  <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-red-500">

                    <Trash2 size={16} />

                    Delete

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


export default RecruitersPage;