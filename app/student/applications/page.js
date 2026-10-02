"use client";

import {
  FileText,
  MapPin,
  CalendarDays,
} from "lucide-react";

import StudentSidebar from "@/Components/student/StudentSidebar";

const ApplicationsPage = () => {

  const applications = [
    {
      job: "Frontend Developer Intern",
      company: "TechCorp",
      location: "Remote",
      date: "July 18, 2026",
      status: "Under Review",
    },
    {
      job: "Full Stack Developer",
      company: "InnovateLabs",
      location: "Bangalore",
      date: "July 15, 2026",
      status: "Shortlisted",
    },
    {
      job: "Backend Developer Intern",
      company: "StartupX",
      location: "Mumbai",
      date: "July 10, 2026",
      status: "Rejected",
    },
  ];


  return (
    <div className="min-h-screen bg-slate-50">

      <StudentSidebar />


      <main className="lg:ml-64">

        <div className="p-6 md:p-8">


          <h1 className="text-3xl font-bold">
            My Applications
          </h1>

          <p className="mt-2 text-slate-500">
            Track the progress of your job applications.
          </p>


          {/* Status Summary */}

          <div className="mt-8 grid gap-4 sm:grid-cols-3">

            <StatusCard
              title="Total Applications"
              value="12"
            />

            <StatusCard
              title="Shortlisted"
              value="4"
            />

            <StatusCard
              title="Under Review"
              value="5"
            />

          </div>


          {/* Applications */}

          <div className="mt-8 space-y-4">

            {applications.map((application, index) => (

              <div
                key={index}
                className="rounded-xl border bg-white p-6"
              >

                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                  <div className="flex gap-4">

                    <div className="rounded-lg bg-green-100 p-3">

                      <FileText
                        size={22}
                        className="text-green-600"
                      />

                    </div>


                    <div>

                      <h2 className="font-bold">
                        {application.job}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {application.company}
                      </p>


                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">

                        <span className="flex items-center gap-1">

                          <MapPin size={14} />

                          {application.location}

                        </span>


                        <span className="flex items-center gap-1">

                          <CalendarDays size={14} />

                          Applied {application.date}

                        </span>

                      </div>

                    </div>

                  </div>


                  <StatusBadge
                    status={application.status}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
};


const StatusCard = ({
  title,
  value,
}) => {

  return (

    <div className="rounded-xl border bg-white p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

    </div>

  );

};


const StatusBadge = ({
  status,
}) => {

  const styles = {
    "Under Review":
      "bg-yellow-100 text-yellow-700",

    Shortlisted:
      "bg-green-100 text-green-700",

    Rejected:
      "bg-red-100 text-red-700",
  };


  return (

    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${
        styles[status]
      }`}
    >
      {status}
    </span>

  );

};


export default ApplicationsPage;