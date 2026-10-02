"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  X,
  Users,
  UserRoundCheck,
  Briefcase,
  BarChart3,
  User,
  Menu,
} from "lucide-react";


const AdminSidebar = () => {
      const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
<>
<button onClick={() => setSidebarOpen((prev)=>!prev)}
  className="fixed left-4 top-4 z-[9999] bg-white p-4 text-white lg:hidden"
>
   {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
</button>

   {sidebarOpen && (
  <div
    className="fixed inset-0 z-50 bg-black/40 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}

<aside
  className={`
    fixed left-0 top-0 z-[60] h-screen w-64
    border-r bg-white p-4
    transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
>
   
      <Link
        href="/"
        className="mb-8 flex items-center gap-3 px-2"
      >

        <img
          src="/businessman.png"
          alt="CareerForge AI"
          className="h-10 w-10 object-contain"
        />

        <span className="text-xl font-bold">

          CareerForge{" "}

          <span className="text-green-500">
            AI
          </span>

        </span>

      </Link>


      {/* Navigation */}

      <nav className="space-y-2">

        <SidebarItem
          href="/admin"
          icon={<LayoutDashboard size={19} />}
          text="Dashboard"
        />

        <SidebarItem
          href="/admin/users"
          icon={<Users size={19} />}
          text="Users"
        />

        <SidebarItem
          href="/admin/recruiters"
          icon={<UserRoundCheck size={19} />}
          text="Recruiters"
        />

        <SidebarItem
          href="/admin/jobs"
          icon={<Briefcase size={19} />}
          text="Jobs"
        />

        <SidebarItem
          href="/admin/analytics"
          icon={<BarChart3 size={19} />}
          text="Analytics"
        />

        <SidebarItem
          href="/admin/profile"
          icon={<User size={19} />}
          text="My Profile"
        />

      </nav>

    </aside>
</>
  );

};


const SidebarItem = ({
  href,
  icon,
  text,
}) => {

  return (

    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-green-50 hover:text-green-600"
    >

      {icon}

      {text}

    </Link>

  );

};


export default AdminSidebar;