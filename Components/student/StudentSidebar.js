"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  User,
} from "lucide-react";

const StudentSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      
     <button
  onClick={() => setSidebarOpen((prev)=>!prev)}
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

      {/* Sidebar */}
     <aside
  className={`
    fixed left-0 top-0 z-[60] h-screen w-64
    border-r bg-white p-4
    transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
>
       
        {/* Logo */}
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
            <span className="text-green-500">AI</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          <SidebarItem
            href="/student"
            icon={<LayoutDashboard size={19} />}
            text="Dashboard"
          />

          <SidebarItem
            href="/student/jobs"
            icon={<Briefcase size={19} />}
            text="Find Jobs"
          />

          <SidebarItem
            href="/student/saved"
            icon={<Bookmark size={19} />}
            text="Saved Jobs"
          />

          <SidebarItem
            href="/student/applications"
            icon={<FileText size={19} />}
            text="Applications"
          />

          <SidebarItem
            href="/student/profile"
            icon={<User size={19} />}
            text="My Profile"
          />
        </nav>
      </aside>
    </>
  );
};

const SidebarItem = ({ href, icon, text }) => {
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

export default StudentSidebar;