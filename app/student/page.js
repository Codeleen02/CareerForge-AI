"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Search,
  Heart,
  FileText,
  User,
  Bot,
  Settings,
  LogOut,
  Bell,
  Briefcase,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const Student = () => {
  const [sidebarOpen,setSidebarOpen] = useState(false)
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

            {/* Search */}
            <div className="hidden items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 md:flex">
              <Search size={18} className="text-slate-500" />

              <input
                type="text"
                placeholder="Search jobs..."
                className="w-48 bg-transparent text-sm outline-none"
              />
            </div>

            {/* Notification */}
            <button className="relative rounded-lg p-2 hover:bg-slate-100">
              <Bell size={21} />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 font-bold text-white">
                R
              </div>

              <div className="hidden md:block">
                <p className="text-sm font-semibold">
                  Rahul Sharma
                </p>

                <p className="text-xs text-slate-500">
                  Student
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

          <div className="space-y-2">

            <SidebarItem
              icon={<LayoutDashboard size={19} />}
              text="Dashboard"
              active
              href="/student"
            />

            <SidebarItem
              icon={<Search size={19} />}
              text="Find Jobs"
              href="/student/jobs"
            />

            <SidebarItem
              icon={<Heart size={19} />}
              text="Saved Jobs"
              href="/student/saved"
            />

            <SidebarItem
              icon={<FileText size={19} />}
              text="My Applications"
              href="/student/applications"
            />

            <SidebarItem
              icon={<User size={19} />}
              text="My Profile"
              href="/student/profile"
            />

            <SidebarItem
              icon={<FileText size={19} />}
              text="My Resume"
              href="/student/resume"
            />

          </div>


          {/* AI Section */}
          <div className="mt-8">

            <p className="mb-3 px-3 text-xs font-bold uppercase text-slate-400">
              AI Tools
            </p>

            <div className="space-y-2">

              <SidebarItem
                icon={<Bot size={19} />}
                text="Resume Review"
                href="/student/ai/resume"
              />

              <SidebarItem
                icon={<Sparkles size={19} />}
                text="Cover Letter"
                href="/student/ai/cover-letter"
              />

              <SidebarItem
                icon={<TrendingUp size={19} />}
                text="Job Match"
                href="/student/ai/job-match"
              />

            </div>

          </div>


          {/* Bottom */}
          <div className="mt-auto space-y-2">

            <SidebarItem
              icon={<Settings size={19} />}
              text="Settings"
              href="/student/settings"
            />

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-500 hover:bg-red-50">
              <LogOut size={19} />
              Logout
            </button>

          </div>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}
      <main className="pt-16 lg:ml-64">

        <div className="p-6 md:p-8">

          {/* Welcome */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Welcome back, Rahul 👋
            </h1>

            <p className="mt-2 text-slate-500">
              Find your next opportunity and grow your career.
            </p>

          </div>


          {/* ================= STATS ================= */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Applications"
              value="12"
              subtitle="+3 this month"
              icon={<Briefcase size={22} />}
            />

            <StatCard
              title="Saved Jobs"
              value="8"
              subtitle="2 closing soon"
              icon={<Heart size={22} />}
            />

            <StatCard
              title="Resume Score"
              value="82%"
              subtitle="Good Resume"
              icon={<FileText size={22} />}
            />

            <StatCard
              title="Profile"
              value="85%"
              subtitle="Almost complete"
              icon={<User size={22} />}
            />

          </div>


          {/* ================= MAIN GRID ================= */}
          <div className="mt-8 grid gap-6 xl:grid-cols-3">

            {/* Recommended Jobs */}
            <div className="rounded-xl border bg-white p-6 xl:col-span-2">

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    Recommended Jobs
                  </h2>

                  <p className="text-sm text-slate-500">
                    Jobs based on your skills and interests.
                  </p>
                </div>

                <Link
                  href="/student/jobs"
                  className="flex items-center gap-1 text-sm font-semibold text-green-600"
                >
                  View all
                  <ArrowRight size={16} />
                </Link>

              </div>


              <div className="space-y-4">

                <JobCard
                  company="Google"
                  title="Frontend Developer Intern"
                  location="Remote"
                  skills="React • Next.js • JavaScript"
                  match="92%"
                />

                <JobCard
                  company="Microsoft"
                  title="Software Engineering Intern"
                  location="Bangalore"
                  skills="Java • Data Structures • Git"
                  match="86%"
                />

                <JobCard
                  company="StartupX"
                  title="Full Stack Developer Intern"
                  location="Mumbai"
                  skills="MERN • MongoDB • Node.js"
                  match="81%"
                />

              </div>

            </div>


            {/* AI Career Insights */}
            <div className="rounded-xl bg-slate-900 p-6 text-white">

              <div className="mb-5 flex items-center gap-3">

                <div className="rounded-lg bg-green-500 p-2">
                  <Bot size={22} />
                </div>

                <div>
                  <h2 className="font-bold">
                    AI Career Insights
                  </h2>

                  <p className="text-xs text-slate-400">
                    Personalized for you
                  </p>
                </div>

              </div>


              <p className="mb-5 text-sm text-slate-300">
                Based on your profile and resume, here are some
                recommendations to improve your career opportunities.
              </p>


              <div className="space-y-4">

                <div>
                  <p className="mb-2 text-sm font-semibold">
                    Your strongest skills
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                      React
                    </span>

                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                      JavaScript
                    </span>

                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                      MongoDB
                    </span>
                  </div>
                </div>


                <div>
                  <p className="mb-2 text-sm font-semibold">
                    Skills to improve
                  </p>

                  <div className="space-y-2 text-sm text-slate-300">
                    <p>⚠ Docker</p>
                    <p>⚠ AWS</p>
                  </div>
                </div>

              </div>


              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-3 text-sm font-bold text-slate-900 hover:bg-green-400">
                View Full Analysis
                <ArrowRight size={16} />
              </button>

            </div>

          </div>


          {/* ================= BOTTOM GRID ================= */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">


            {/* Applications */}
            <div className="rounded-xl border bg-white p-6">

              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  Recent Applications
                </h2>

                <Link
                  href="/student/applications"
                  className="text-sm font-semibold text-green-600"
                >
                  View all
                </Link>

              </div>


              <div className="space-y-4">

                <Application
                  company="Google"
                  position="Frontend Intern"
                  status="Under Review"
                  type="review"
                />

                <Application
                  company="Microsoft"
                  position="Software Intern"
                  status="Shortlisted"
                  type="success"
                />

                <Application
                  company="StartupX"
                  position="React Developer"
                  status="Rejected"
                  type="rejected"
                />

              </div>

            </div>


            {/* Profile Completion */}
            <div className="rounded-xl border bg-white p-6">

              <h2 className="text-xl font-bold">
                Complete Your Profile
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                A complete profile helps recruiters find you.
              </p>


              <div className="mt-6">

                <div className="mb-2 flex justify-between text-sm font-semibold">
                  <span>Profile Completion</span>
                  <span>85%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[85%] rounded-full bg-green-500"></div>
                </div>

              </div>


              <div className="mt-6 space-y-3">

                <ProfileTask
                  text="Add profile picture"
                  completed
                />

                <ProfileTask
                  text="Add your skills"
                  completed
                />

                <ProfileTask
                  text="Upload resume"
                  completed
                />

                <ProfileTask
                  text="Add GitHub profile"
                />

              </div>


              <Link
                href="/student/profile"
                className="mt-6 block rounded-lg border py-3 text-center text-sm font-semibold hover:bg-slate-50"
              >
                Complete Profile
              </Link>

            </div>

          </div>

        </div>

      </main>

    </div>
    </>
  );
};


/* ================= COMPONENTS ================= */

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


const JobCard = ({
  company,
  title,
  location,
  skills,
  match,
}) => {

  return (
    <div className="rounded-lg border p-4 transition hover:border-green-400 hover:shadow-sm">

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 font-bold">
            {company[0]}
          </div>

          <div>

            <h3 className="font-bold">
              {title}
            </h3>

            <p className="text-sm text-slate-500">
              {company} • {location}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {skills}
            </p>

          </div>

        </div>


        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
          {match} Match
        </span>

      </div>


      <div className="mt-4 flex justify-end">

        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          View Job
        </button>

      </div>

    </div>
  );
};


const Application = ({
  company,
  position,
  status,
  type,
}) => {

  const styles = {
    success: "bg-green-100 text-green-700",
    review: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">

      <div>

        <p className="font-semibold">
          {position}
        </p>

        <p className="text-sm text-slate-500">
          {company}
        </p>

      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[type]}`}
      >
        {status}
      </span>

    </div>
  );
};


const ProfileTask = ({
  text,
  completed = false,
}) => {

  return (
    <div className="flex items-center gap-3">

      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full ${
          completed
            ? "bg-green-500 text-white"
            : "border-2 border-slate-300"
        }`}
      >
        {completed && <CheckCircle size={14} />}
      </div>

      <span
        className={`text-sm ${
          completed
            ? "text-slate-500 line-through"
            : "font-medium"
        }`}
      >
        {text}
      </span>

    </div>
  );
};


export default Student;