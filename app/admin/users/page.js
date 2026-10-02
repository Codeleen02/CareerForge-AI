"use client";

import {
  Search,
  Trash2,
  Eye,
} from "lucide-react";

import AdminSidebar from "@/Components/admin/AdminSidebar";


const UsersPage = () => {

  const users = [

    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "Student",
      status: "Active",
    },

    {
      name: "Priya Patel",
      email: "priya@example.com",
      role: "Student",
      status: "Active",
    },

    {
      name: "Aman Verma",
      email: "aman@example.com",
      role: "Student",
      status: "Suspended",
    },

  ];


  return (

    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />


      <main className="lg:ml-64">

        <div className="p-6 md:p-8">


          <h1 className="text-3xl font-bold">
            Users
          </h1>

          <p className="mt-2 text-slate-500">
            Manage registered students on the platform.
          </p>


          {/* Search */}

          <div className="relative mt-8 max-w-md">

            <Search
              size={19}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search users..."
              className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 outline-none focus:border-green-500"
            />

          </div>


          {/* Users */}

          <div className="mt-6 overflow-hidden rounded-xl border bg-white">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="border-b bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-sm">
                      User
                    </th>

                    <th className="px-6 py-4 text-sm">
                      Role
                    </th>

                    <th className="px-6 py-4 text-sm">
                      Status
                    </th>

                    <th className="px-6 py-4 text-sm">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {users.map((user, index) => (

                    <tr
                      key={index}
                      className="border-b last:border-0"
                    >

                      <td className="px-6 py-5">

                        <p className="font-semibold">
                          {user.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {user.email}
                        </p>

                      </td>


                      <td className="px-6 py-5">
                        {user.role}
                      </td>


                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>

                      </td>


                      <td className="px-6 py-5">

                        <div className="flex gap-2">

                          <button className="rounded-lg border p-2 hover:bg-slate-50">

                            <Eye size={17} />

                          </button>


                          <button className="rounded-lg border p-2 text-red-500 hover:bg-red-50">

                            <Trash2 size={17} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

};


export default UsersPage;