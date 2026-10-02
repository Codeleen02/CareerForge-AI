"use client";

import {
  Users,
  Briefcase,
  UserRoundCheck,
  FileText,
} from "lucide-react";

import AdminSidebar from "@/Components/admin/AdminSidebar";


const AnalyticsPage = () => {

  return (

    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />


      <main className="lg:ml-64">

        <div className="p-6 md:p-8">


          <h1 className="text-3xl font-bold">
            Platform Analytics
          </h1>

          <p className="mt-2 text-slate-500">
            Overview of CareerForge AI platform activity.
          </p>


          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">


            <AnalyticsCard
              icon={<Users />}
              title="Total Students"
              value="12,450"
            />


            <AnalyticsCard
              icon={<UserRoundCheck />}
              title="Total Recruiters"
              value="540"
            />


            <AnalyticsCard
              icon={<Briefcase />}
              title="Total Jobs"
              value="4,820"
            />


            <AnalyticsCard
              icon={<FileText />}
              title="Applications"
              value="28,420"
            />

          </div>


          {/* Chart Placeholder */}

          <div className="mt-8 flex h-80 items-center justify-center rounded-xl border bg-white">

            <p className="text-slate-400">
              Analytics Chart will appear here
            </p>

          </div>

        </div>

      </main>

    </div>

  );

};


const AnalyticsCard = ({
  icon,
  title,
  value,
}) => {

  return (

    <div className="rounded-xl border bg-white p-6">

      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">

        {icon}

      </div>

      <p className="mt-5 text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-1 text-3xl font-bold">
        {value}
      </h2>

    </div>

  );

};


export default AnalyticsPage;