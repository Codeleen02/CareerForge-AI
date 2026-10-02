"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Briefcase,
  Building2,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  ShieldCheck,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  MoreVertical,
  UserX,
  Menu, X,
} from "lucide-react";

const AdminDashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white">
        <div className="flex h-16 items-center justify-between px-6">

         <button
  onClick={() => setSidebarOpen((prev) => !prev)}
  className="fixed left-4 top-4 z-[70] rounded-lg border bg-white p-2 shadow-md lg:hidden"
  aria-label={sidebarOpen ? "Close menu" : "Open menu"}
>
  {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
</button>

 {sidebarOpen && (
  <div
    className="fixed inset-0 z-[55] bg-black/40 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}


          {/* Logo */}

          <Link href="/" className="flex items-center gap-3">

            <img
              src="/businessman.png"
              alt="CareerForge AI"
              className="h-10 w-10 object-contain"
            />

            <span className="text-xl font-bold">
              CareerForge <span className="text-green-500">AI</span>
            </span>

          </Link>


          {/* Right Side */}

          <div className="flex items-center gap-5">

            {/* Notification */}

            <button className="relative rounded-lg p-2 hover:bg-slate-100">

              <Bell size={21} />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>

            </button>


            {/* Admin Profile */}

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
                A
              </div>

              <div className="hidden md:block">

                <p className="text-sm font-semibold">
                  Admin
                </p>

                <p className="text-xs text-slate-500">
                  Platform Administrator
                </p>

              </div>

            </div>

          </div>

        </div>
      </nav>


      {/* ================= SIDEBAR ================= */}

        <aside
  className={`fixed left-0 top-16 z-[60] h-[calc(100vh-64px)] w-64 border-r bg-white p-4 shadow-xl transition-transform duration-300 lg:block lg:translate-x-0 ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>

        <div className="flex h-full flex-col">

          {/* Main Navigation */}

          <div className="space-y-2">

            <SidebarItem
              icon={<LayoutDashboard size={19} />}
              text="Dashboard"
              href="/admin/"
              active
            />

            <SidebarItem
              icon={<Users size={19} />}
              text="Users"
              href="/admin/users"
            />

            <SidebarItem
              icon={<UserCheck size={19} />}
              text="Recruiters"
              href="/admin/recruiters"
            />

            <SidebarItem
              icon={<Briefcase size={19} />}
              text="Jobs"
              href="/admin/jobs"
            />

            <SidebarItem
              icon={<BarChart3 size={19} />}
              text="Analytics"
              href="/admin/analytics"
            />

          </div>


          {/* Bottom */}

          <div className="mt-auto space-y-2">

            <SidebarItem
              icon={<Settings size={19} />}
              text="Settings"
              href="/admin/settings"
            />

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-500 hover:bg-red-50">

              <LogOut size={19} />

              Logout

            </button>

          </div>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="pt-16 lg:ml-64">

        <div className="p-6 md:p-8">


          {/* Header */}

          <div className="mb-8">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <h1 className="text-3xl font-bold">
                  Admin Dashboard
                </h1>

                <p className="mt-2 text-slate-500">
                  Monitor and manage the CareerForge AI platform.
                </p>

              </div>


              {/* Admin Badge */}

              <div className="flex w-fit items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">

                <ShieldCheck size={18} />

                Admin Mode

              </div>

            </div>

          </div>


          {/* ================= STATS ================= */}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


            <StatCard
              title="Total Users"
              value="12,540"
              subtitle="+8.4% this month"
              icon={<Users size={22} />}
            />


            <StatCard
              title="Recruiters"
              value="842"
              subtitle="+32 this month"
              icon={<UserCheck size={22} />}
            />


            <StatCard
              title="Active Jobs"
              value="1,284"
              subtitle="+124 this month"
              icon={<Briefcase size={22} />}
            />


            <StatCard
              title="Applications"
              value="18,920"
              subtitle="+12.6% this month"
              icon={<BarChart3 size={22} />}
            />

          </div>


          {/* ================= MAIN CONTENT ================= */}

          <div className="mt-8 grid gap-6 xl:grid-cols-3">


            {/* Platform Overview */}

            <div className="rounded-xl border bg-white p-6 xl:col-span-2">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    Platform Overview
                  </h2>

                  <p className="text-sm text-slate-500">
                    Monitor platform activity and growth.
                  </p>

                </div>

                <Link
                  href="/admin/analytics"
                  className="flex items-center gap-1 text-sm font-semibold text-green-600"
                >
                  View Analytics

                  <ArrowRight size={16} />

                </Link>

              </div>


              {/* Fake Chart */}

              <div className="flex h-64 items-end gap-3 rounded-lg bg-slate-50 p-6">

                <ChartBar height="40%" />
                <ChartBar height="55%" />
                <ChartBar height="45%" />
                <ChartBar height="70%" />
                <ChartBar height="60%" />
                <ChartBar height="80%" />
                <ChartBar height="95%" />
                <ChartBar height="75%" />
                <ChartBar height="90%" />
                <ChartBar height="100%" />

              </div>


              <div className="mt-4 flex justify-between text-xs text-slate-500">

                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>

              </div>

            </div>


            {/* Moderation */}

            <div className="rounded-xl bg-slate-900 p-6 text-white">

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-red-500/20 p-3 text-red-400">

                  <AlertTriangle size={22} />

                </div>

                <div>

                  <h2 className="font-bold">
                    Requires Attention
                  </h2>

                  <p className="text-sm text-slate-400">
                    Items requiring moderation.
                  </p>

                </div>

              </div>


              <div className="mt-6 space-y-4">


                <ModerationItem
                  title="Reported Jobs"
                  value="12"
                  icon={<Briefcase size={18} />}
                />


                <ModerationItem
                  title="Flagged Users"
                  value="7"
                  icon={<UserX size={18} />}
                />


                <ModerationItem
                  title="Pending Recruiters"
                  value="18"
                  icon={<Clock size={18} />}
                />

              </div>


              <Link
                href="/admin/reports"
                className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Review Reports

                <ArrowRight size={16} />

              </Link>

            </div>

          </div>


          {/* ================= BOTTOM ================= */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">


            {/* Recent Users */}

            <div className="rounded-xl border bg-white p-6">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    Recent Users
                  </h2>

                  <p className="text-sm text-slate-500">
                    Recently registered users.
                  </p>

                </div>

                <Link
                  href="/admin/users"
                  className="text-sm font-semibold text-green-600"
                >
                  View all
                </Link>

              </div>


              <div className="space-y-4">


                <UserRow
                  name="Rahul Sharma"
                  email="rahul@example.com"
                  role="Student"
                  letter="R"
                />


                <UserRow
                  name="Priya Patel"
                  email="priya@example.com"
                  role="Student"
                  letter="P"
                />


                <UserRow
                  name="TechCorp"
                  email="hr@techcorp.com"
                  role="Recruiter"
                  letter="T"
                />


                <UserRow
                  name="Aman Verma"
                  email="aman@example.com"
                  role="Student"
                  letter="A"
                />

              </div>

            </div>


            {/* Recent Jobs */}

            <div className="rounded-xl border bg-white p-6">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    Recent Jobs
                  </h2>

                  <p className="text-sm text-slate-500">
                    Latest jobs posted on the platform.
                  </p>

                </div>

                <Link
                  href="/admin/jobs"
                  className="text-sm font-semibold text-green-600"
                >
                  View all
                </Link>

              </div>


              <div className="space-y-4">


                <JobRow
                  title="Frontend Developer Intern"
                  company="TechCorp"
                  status="Active"
                />


                <JobRow
                  title="Backend Engineer"
                  company="InnovateLabs"
                  status="Pending"
                />


                <JobRow
                  title="UI/UX Designer"
                  company="DesignHub"
                  status="Active"
                />


                <JobRow
                  title="Full Stack Developer"
                  company="StartupX"
                  status="Reported"
                />

              </div>

            </div>

          </div>


          {/* ================= SYSTEM STATUS ================= */}

          <div className="mt-6 rounded-xl border bg-white p-6">

            <h2 className="text-xl font-bold">
              System Status
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">


              <SystemStatus
                title="API Server"
                status="Operational"
              />


              <SystemStatus
                title="Database"
                status="Operational"
              />


              <SystemStatus
                title="AI Services"
                status="Operational"
              />

            </div>

          </div>

        </div>

      </main>

    </div>
    </>
  );
};


/* ================= REUSABLE COMPONENTS ================= */


const SidebarItem = ({
  icon,
  text,
  href,
  active = false,
}) => {

  return (

    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
        active
          ? "bg-green-100 text-green-700"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >

      {icon}

      {text}

    </Link>

  );

};


const StatCard = ({
  title,
  value,
  subtitle,
  icon,
}) => {

  return (

    <div className="rounded-xl border bg-white p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {value}
          </p>

          <p className="mt-1 text-xs text-green-600">
            {subtitle}
          </p>

        </div>


        <div className="rounded-lg bg-green-100 p-3 text-green-600">

          {icon}

        </div>

      </div>

    </div>

  );

};


const ChartBar = ({
  height,
}) => {

  return (

    <div className="flex h-full flex-1 items-end">

      <div
        className="w-full rounded-t-md bg-green-500 transition hover:bg-green-600"
        style={{
          height: height,
        }}
      />

    </div>

  );

};


const ModerationItem = ({
  title,
  value,
  icon,
}) => {

  return (

    <div className="flex items-center justify-between rounded-lg border border-slate-700 p-4">

      <div className="flex items-center gap-3">

        <div className="text-red-400">
          {icon}
        </div>

        <span className="text-sm">
          {title}
        </span>

      </div>


      <span className="font-bold">
        {value}
      </span>

    </div>

  );

};


const UserRow = ({
  name,
  email,
  role,
  letter,
}) => {

  return (

    <div className="flex items-center justify-between rounded-lg border p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">

          {letter}

        </div>


        <div>

          <p className="font-semibold">
            {name}
          </p>

          <p className="text-xs text-slate-500">
            {email}
          </p>

        </div>

      </div>


      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">

        {role}

      </span>

    </div>

  );

};


const JobRow = ({
  title,
  company,
  status,
}) => {

  return (

    <div className="flex items-center justify-between rounded-lg border p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">

          <Briefcase size={19} />

        </div>


        <div>

          <p className="font-semibold">
            {title}
          </p>

          <p className="text-xs text-slate-500">
            {company}
          </p>

        </div>

      </div>


      <div className="flex items-center gap-3">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>


        <button className="rounded-lg p-2 hover:bg-slate-100">

          <MoreVertical size={17} />

        </button>

      </div>

    </div>

  );

};


const SystemStatus = ({
  title,
  status,
}) => {

  return (

    <div className="flex items-center justify-between rounded-lg border p-4">

      <div className="flex items-center gap-3">

        <div className="rounded-full bg-green-100 p-2 text-green-600">

          <CheckCircle size={18} />

        </div>

        <span className="font-medium">
          {title}
        </span>

      </div>


      <span className="text-sm font-semibold text-green-600">

        {status}

      </span>

    </div>

  );

};


export default AdminDashboard;