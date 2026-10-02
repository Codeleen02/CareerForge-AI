"use client";

import {
  Briefcase,
  Users,
  UserCheck,
  TrendingUp,
  Clock,
} from "lucide-react";

import RecruiterSidebar from "@/Components/recruiter/RecruiterSidebar";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchAnalytics , applyfilter , recentjob , ApplicationsOverview} from "@/actions/Analyticsaction";
const RecruiterAnalyticsPage = () => {
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      period: "6months",
    },
  });
  const [Applications,setApplications] = useState({})
  const [jobs, setjobs] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    shortlisted: 0,
  });
  const [job, setjob] = useState({})
  const [loading, setLoading] = useState(true);
  const [applicationoverview,setapplicationoverview] = useState([])

  useEffect(() => {
    const getAnalytics = async () => {
      try {
       
        const recruiterId = session?.user?.id;

    if (!recruiterId) return;

    console.log("Fetch analytics:", recruiterId);

      const result = await fetchAnalytics(recruiterId)
       
      if(result?.success){
        setjobs(result.analytics)
      }
       
      } catch (error) {
        console.error(
          "Failed to fetch analytics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      getAnalytics();
    }
  }, [session?.user?.id, status]);

 const getfilter = async (data) =>{
  try{
   const result = await applyfilter(data.period);

   if(result?.success){
    setApplications(result.Applications)
    console.log("Selected period:", data.period);
console.log("Applications returned:", result.applications.length);
   }else{
    console.error(result?.error)
   }
  }catch (error){
    console.error("Failed to apply filter", error)
  }
 }
  const onSubmit = (data) => {
    console.log("Selected period:", data.period);

    // LOGIC:
    // Call your analytics action again using the
    // selected period.

    // Example later:
    // fetchRecruiterAnalytics(
    //   session.user.id,
    //   data.period
    // );
  };
  const getApplicationsOverview = async () =>{
   try{
     const result = await ApplicationsOverview()
     if(result?.success){
      setapplicationoverview(result.applicationsOverview)
     }  else{
      console.error("Failed to fetch recent jobs",result?.error)
    }
   } catch (error){
    console.error("Failed to fetch the application overview",error)
   }
  }
  useEffect(() => {
  getApplicationsOverview();
}, []);
 const getrecentjob = async () =>{
   try{
    const result = await recentjob()
    if(result?.success){
    setjob(result.job)
    } else{
      console.error("Failed to fetch recent jobs",error)
    }
   } catch(error){
     console.error("Failed to fetch recent jobs",error)
   }
 }

 useEffect(() => {
  getrecentjob();
}, []);

  const stats = [
    {
      title: "Total Jobs",
      value: jobs.totalJobs,
      icon: <Briefcase size={24} />,
      change: `{+ ${jobs.totalJobs} this month}`,
    },

    {
      title: "Active Jobs",
      value: jobs.activeJobs,
      icon: <TrendingUp size={24} />,
      change: `{+ ${jobs.activeJobs} this month}`,
    },

    {
      title: "Total Applications",
      value: jobs.totalApplications,
      icon: <Users size={24} />,
      change:  `{+ ${jobs.totalApplications} this month}`,
    },

    {
      title: "Shortlisted",
      value: jobs.totalShortlisted,
      icon: <UserCheck size={24} />,
      change:  `{+ ${jobs.totalShortlisted} this month}`,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">

        <RecruiterSidebar />

        <main className="lg:ml-64">
          <div className="p-6 md:p-8">

            <p className="text-slate-500">
              Loading analytics...
            </p>

          </div>
        </main>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}

      <RecruiterSidebar />

      {/* Main Content */}

      <main className="lg:ml-64">

        <div className="p-6 md:p-8">

          {/* Header */}

          <div>
            <h1 className="text-3xl font-bold">
              Analytics
            </h1>

            <p className="mt-2 text-slate-500">
              Track your hiring performance and recruitment activity.
            </p>
          </div>

          {/* Analytics Filter */}

          <form
            onSubmit={handleSubmit(getfilter)}
            className="mt-6 flex flex-wrap items-end gap-3"
          >

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Time Period
              </label>

              <select
                {...register("period")}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-500"
              >
                <option value="6months">
                  Last 6 Months
                </option>

                <option value="12months">
                  Last 12 Months
                </option>

                <option value="30days">
                  Last 30 Days
                </option>

                <option value="7days">
                  Last 7 Days
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              Apply Filter
            </button>

          </form>

          {/* Stats */}

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat, index) => (

              <div
                key={index}
                className="rounded-xl border bg-white p-6"
              >

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    {stat.icon}
                  </div>

                  <TrendingUp
                    size={18}
                    className="text-green-500"
                  />

                </div>

                <p className="mt-5 text-sm text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs font-medium text-green-600">
                  {stat.change}
                </p>

              </div>

            ))}

          </div>

          {/* Hiring Overview */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            {/* Applications Chart */}

            <div className="rounded-xl border bg-white p-6">

              <div>
                <h2 className="text-xl font-bold">
                  Applications Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Applications received over the last 6 months.
                </p>
              </div>

              {/* Chart Placeholder */}

              <div className="mt-8 flex h-64 items-end justify-around gap-3 border-b border-l p-5">
{applicationoverview.map((item) => (
  <ChartBar
    key={item.month}
    height={item.percentage}
    month={["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][item.month - 1]}
  />
))}

              </div>

            </div>

            {/* Hiring Funnel */}

            <div className="rounded-xl border bg-white p-6">

              <h2 className="text-xl font-bold">
                Hiring Funnel
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Candidate progress across your recruitment process.
              </p>

              <div className="mt-8 space-y-6">

                <FunnelItem
                  title="Applications"
                  value={jobs.totalApplications}
                  percentage="100%"
                />

                <FunnelItem
                  title="Under Review"
                  value={jobs.totalApplications - jobs.totalShortlisted}
                  percentage={
                    jobs.totalApplications > 0
                      ? `${Math.round(
                          ((jobs.totalApplications -
                            jobs.totalShortlisted) /
                            jobs.totalApplications) *
                            100
                        )}%`
                      : "0%"
                  }
                />

                <FunnelItem
                  title="Shortlisted"
                  value={jobs.totalShortlisted}
                  percentage={
                    jobs.totalApplications > 0
                      ? `${Math.round(
                          (jobs.totalShortlisted /
                            jobs.totalApplications) *
                            100
                        )}%`
                      : "0%"
                  }
                />

              </div>

            </div>

          </div>

          {/* Jobs Performance */}

          {/* <div className="mt-8 rounded-xl border bg-white p-6">

            <div className="flex items-center gap-3">

              <Briefcase
                size={22}
                className="text-green-500"
              />

              <div> */}
{/* 
                <h2 className="text-xl font-bold">
                  Job Performance
                </h2>

                <p className="text-sm text-slate-500">
                  See how each job is performing.
                </p>

              </div>

            </div>

            <div className="mt-6 overflow-x-auto">

              <table className="w-full min-w-[600px] text-left">

                <thead className="border-b bg-slate-50">

                  <tr>

                    <th className="px-4 py-4 text-sm">
                      Job
                    </th>

                    <th className="px-4 py-4 text-sm">
                      Applications
                    </th>

                    <th className="px-4 py-4 text-sm">
                      Shortlisted
                    </th>

                    <th className="px-4 py-4 text-sm">
                      Rejected
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {jobs.length === 0 ? (

                    <tr>

                      <td
                        colSpan="4"
                        className="px-4 py-6 text-center text-sm text-slate-500"
                      >
                        No job analytics available.
                      </td>

                    </tr>

                  ) : (

                    analytics.map((job, index) => (

                      <tr
                        key={job._id || index}
                        className="border-b last:border-0"
                      >

                        <td className="px-4 py-5 font-semibold">
                          {job.title}
                        </td>

                        <td className="px-4 py-5">
                          {job.applications}
                        </td>

                        <td className="px-4 py-5 text-green-600">
                          {job.shortlisted}
                        </td>

                        <td className="px-4 py-5 text-red-500">
                          {job.rejected}
                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>
            
          </div>
*/}

{/* Recent activity */}
          <div className="mt-8 rounded-xl border bg-white p-6">

            <h2 className="text-xl font-bold">
              Recent Activity
            </h2>

            <div className="mt-5 space-y-4">

              <Activity
                text={` ${jobs.totalApplications} new application received`}
                time="10 minutes ago"
              />

              <Activity
                text={`Shortlisted jobs: ${jobs.totalShortlisted}`}
                time="1 hour ago"
              />

              <Activity
                text= { `New job posted: ${job.title}`}
                time="3 hours ago"
              />

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}; 


/* Chart Bar */

const ChartBar = ({
  height,
  month,
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-end gap-2">

      <div
        style={{ height }}
        className="w-8 rounded-t-lg bg-green-500 transition hover:bg-green-600"
      />

      <span className="text-xs text-slate-500">
        {month}
      </span>

    </div>
  );
};


/* Funnel Item */

const FunnelItem = ({
  title,
  value,
  percentage,
}) => {
  return (
    <div>

      <div className="mb-2 flex justify-between">

        <span className="text-sm font-medium">
          {title}
        </span>

        <span className="text-sm font-semibold">
          {value} ({percentage})
        </span>

      </div>

      <div className="h-2 rounded-full bg-slate-100">

        <div
          className="h-2 rounded-full bg-green-500"
          style={{
            width: percentage,
          }}
        />

      </div>

    </div>
  );
};


/* Recent Activity */

const Activity = ({
  text,
  time,
}) => {
  return (
    <div className="flex items-center justify-between border-b pb-4">

      <div className="flex items-center gap-3">

        <Clock
          size={17}
          className="text-slate-400"
        />

        <p className="text-sm font-medium">
          {text}
        </p>

      </div>

      <span className="text-xs text-slate-400">
        {time}
      </span>

    </div>
  );
};

export default RecruiterAnalyticsPage;

