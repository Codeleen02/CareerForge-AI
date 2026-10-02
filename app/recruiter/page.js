"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Briefcase,
  Users,
  Eye,
  Plus,
  TrendingUp,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";

import RecruiterSidebar from "@/Components/recruiter/RecruiterSidebar";
import { ToastContainer } from "react-toastify";
const RecruiterDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
 <ToastContainer
              position="top-right"
              autoClose={5000}
              theme="colored"
            />
      
      
      <RecruiterSidebar />

      {/* Main Content */}
      <main className="lg:ml-64">

        <div className="p-6 md:p-8">

          {/* Header */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Recruiter Dashboard
              </h1>

              <p className="mt-2 text-slate-500">
                Manage your jobs and track your recruitment activity.
              </p>
            </div>

          </div>


          {/* Statistics */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Total Jobs */}
            <div className="rounded-xl border bg-white p-5">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Jobs
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    12
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Briefcase
                    size={23}
                    className="text-green-600"
                  />
                </div>

              </div>

              <p className="mt-4 text-sm text-green-600">
                8 active jobs
              </p>

            </div>


            {/* Total Applications */}
            <div className="rounded-xl border bg-white p-5">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Applications
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    86
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Users
                    size={23}
                    className="text-blue-600"
                  />
                </div>

              </div>

              <p className="mt-4 text-sm text-slate-500">
                Across all jobs
              </p>

            </div>


            {/* Job Views */}
            <div className="rounded-xl border bg-white p-5">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Job Views
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    1,240
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Eye
                    size={23}
                    className="text-purple-600"
                  />
                </div>

              </div>

              <p className="mt-4 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp size={15} />
                12% this month
              </p>

            </div>


            {/* Candidates */}
            <div className="rounded-xl border bg-white p-5">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Candidates
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    34
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Users
                    size={23}
                    className="text-orange-600"
                  />
                </div>

              </div>

              <p className="mt-4 text-sm text-slate-500">
                Shortlisted candidates
              </p>

            </div>

          </div>


          {/* Main Grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">


            {/* Recent Jobs */}
            <div className="rounded-xl border bg-white lg:col-span-2">

              <div className="flex items-center justify-between border-b p-6">

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Recent Jobs
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your recently posted jobs
                  </p>
                </div>

                <Link
                  href="/recruiter/jobs"
                  className="flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
                >
                  View all
                  <ArrowRight size={16} />
                </Link>

              </div>


              {/* Job 1 */}
              <div className="border-b p-6">

                <div className="flex flex-col justify-between gap-4 sm:flex-row">

                  <div className="flex gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100">
                      <Briefcase
                        size={21}
                        className="text-green-600"
                      />
                    </div>

                    <div>

                      <h3 className="font-bold text-slate-900">
                        Full Stack Developer
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">

                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          Mumbai
                        </span>

                        <span>
                          Full Time
                        </span>

                      </div>

                    </div>

                  </div>


                  <span className="h-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>

                </div>


                <div className="mt-4 flex items-center justify-between">

                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    <Users size={16} />
                    5 openings
                  </span>

                  <span className="text-sm text-slate-500">
                    24 applications
                  </span>

                </div>

              </div>


              {/* Job 2 */}
              <div className="border-b p-6">

                <div className="flex flex-col justify-between gap-4 sm:flex-row">

                  <div className="flex gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100">
                      <Briefcase
                        size={21}
                        className="text-green-600"
                      />
                    </div>

                    <div>

                      <h3 className="font-bold text-slate-900">
                        Frontend Developer
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">

                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          Bangalore
                        </span>

                        <span>
                          Internship
                        </span>

                      </div>

                    </div>

                  </div>


                  <span className="h-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>

                </div>


                <div className="mt-4 flex items-center justify-between">

                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    <Users size={16} />
                    3 openings
                  </span>

                  <span className="text-sm text-slate-500">
                    18 applications
                  </span>

                </div>

              </div>


              {/* Job 3 */}
              <div className="p-6">

                <div className="flex flex-col justify-between gap-4 sm:flex-row">

                  <div className="flex gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100">
                      <Briefcase
                        size={21}
                        className="text-slate-500"
                      />
                    </div>

                    <div>

                      <h3 className="font-bold text-slate-900">
                        Backend Developer
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">

                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          Pune
                        </span>

                        <span>
                          Full Time
                        </span>

                      </div>

                    </div>

                  </div>


                  <span className="h-fit rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    Closed
                  </span>

                </div>


                <div className="mt-4 flex items-center justify-between">

                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    <Users size={16} />
                    2 openings
                  </span>

                  <span className="text-sm text-slate-500">
                    9 applications
                  </span>

                </div>

              </div>

            </div>


            {/* Right Column */}
            <div className="space-y-6">

              {/* Activity */}
              <div className="rounded-xl border bg-white p-6">

                <h2 className="text-xl font-bold text-slate-900">
                  Recent Activity
                </h2>

                <div className="mt-5 space-y-5">

                  <div className="flex gap-3">

                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Users
                        size={15}
                        className="text-green-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        New application received
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Full Stack Developer
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        2 hours ago
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-3">

                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Eye
                        size={15}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        Job viewed 15 times
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Frontend Developer
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        5 hours ago
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-3">

                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100">
                      <Clock
                        size={15}
                        className="text-orange-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        Application deadline approaching
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Backend Developer
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Yesterday
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default RecruiterDashboard;


