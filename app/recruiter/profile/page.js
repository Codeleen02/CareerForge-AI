"use client";
import { recruiterProfile } from "@/actions/useractions";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSession} from "next-auth/react";
import { signOut } from "next-auth/react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Lock,
  Save,
  Camera,
  LogOut,
} from "lucide-react";

import RecruiterSidebar from "@/Components/recruiter/RecruiterSidebar";

const RecruiterProfilePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset: resetProfile,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const name = watch("name");
  const email = watch("email");
  const { data: session, status } = useSession();
useEffect(() => {
    if (status === "authenticated") {
      resetProfile({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
        position: session.user.position || "",
      });
    }
  }, [session, status, resetProfile]);
 const onSubmit = async (data) => {
     try {
       if (!session?.user?.id) {
         toast.error("Session missing or user not authenticated");
         return;
       }
       console.log("Form Data:", data);
       console.log("Session:", session);
       const formData = new FormData();
       Object.entries(data).forEach(([key, value]) => {
         formData.append(key, value);
       });
 
       const result = await recruiterProfile(formData, session.user.id);
 
       if (result?.error) {
         alert(result.error);
         return;
       }
       toast.success("Profile updated successfully!");
 
     } catch (error) {
 
       console.error("Profile update error:", error);
 
       toast.error("Failed to update profile");
 
     }
 
   };

  const handlePasswordChange = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    console.log("Password Data:", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };


  return (
    <div className="min-h-screen bg-slate-50">
    <ToastContainer
              position="top-right"
              autoClose={5000}
              theme="colored"
            />
      
      
      {/* Sidebar */}
      <RecruiterSidebar />

      {/* Main Content */}
      <main className="lg:ml-64">

        <div className="p-6 md:p-8">

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">
              My Profile
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your recruiter account and personal information.
            </p>
          </div>

          {/* Profile Card */}
          <div className="mt-8 max-w-4xl rounded-xl border bg-white p-6 md:p-8">

            {/* Profile Header */}
            <div className="flex flex-col gap-5 border-b pb-8 sm:flex-row sm:items-center">

              {/* Profile Picture */}
              <div className="relative">

                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-green-100">

                  <User
                    size={40}
                    className="text-green-600"
                  />

                </div>

                {/* Camera Button */}
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600"
                >
                  <Camera size={16} />
                </button>

              </div>

              {/* Recruiter Info */}
              <div>

                <h2 className="text-2xl font-bold">
                  {name || "Recruiter"}
                </h2>

                <p className="mt-1 text-slate-500">
                  {email || "No email"}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-green-600">

                  <Briefcase size={17} />

                  Recruiter

                </div>

              </div>

            </div>

            {/* Personal Information */}
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="mt-8">

                <h2 className="text-xl font-bold">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your personal details.
                </p>

                {/* Full Name */}
                <div className="mt-6">

                  <label className="mb-2 block text-sm font-semibold">
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="text"
                      {...register("name", {
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none transition focus:border-green-500 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />

                  </div>

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}

                </div>

                {/* Email */}
                <div className="mt-5">

                  <label className="mb-2 block text-sm font-semibold">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="email"
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value:
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email",
                        },
                      })}
                      className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none transition focus:border-green-500 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />

                  </div>

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}

                </div>

                {/* Phone */}
                <div className="mt-5">

                  <label className="mb-2 block text-sm font-semibold">
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      {...register("phone", {
                        pattern: {
                          value: /^[0-9+\-\s()]{10,15}$/,
                          message: "Enter a valid phone number",
                        },
                      })}
                      className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none transition focus:border-green-500 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                    />

                  </div>

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}

                </div>

                {/* Job Position */}
                <div className="mt-5">

                  <label className="mb-2 block text-sm font-semibold">
                    Job Position
                  </label>

                  <div className="relative">

                    <Briefcase
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="text"
                      {...register("position", {
                        required: "Job position is required",
                      })}
                      className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none transition focus:border-green-500 ${
                        errors.position ? "border-red-500" : ""
                      }`}
                    />

                  </div>

                  {errors.position && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.position.message}
                    </p>
                  )}

                </div>

                {/* Save */}
                <button
                  type="submit"
                  className="mt-6 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600 active:scale-95"
                >
                  <Save size={18} />
                  Save Changes
                </button>

              </div>

            </form>

            {/* Account Security */}
            <form onSubmit={handleSubmit(handlePasswordChange)}>

              <div className="mt-10 border-t pt-8">

                <h2 className="text-xl font-bold">
                  Account Security
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Change your recruiter account password.
                </p>

                {/* Current Password */}
                <div className="mt-6">

                  <label className="mb-2 block text-sm font-semibold">
                    Current Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="password"
                      placeholder="Enter current password"
                      {...register("currentPassword", {
                        required: "Current password is required",
                      })}
                      className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:border-green-500 ${
                        errors.currentPassword
                          ? "border-red-500"
                          : ""
                      }`}
                    />

                  </div>

                  {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.currentPassword.message}
                    </p>
                  )}

                </div>

                {/* New Password */}
                <div className="mt-5">

                  <label className="mb-2 block text-sm font-semibold">
                    New Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="password"
                      placeholder="Enter new password"
                      {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters",
                        },
                      })}
                      className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:border-green-500 ${
                        errors.newPassword
                          ? "border-red-500"
                          : ""
                      }`}
                    />

                  </div>

                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.newPassword.message}
                    </p>
                  )}

                </div>

                {/* Confirm Password */}
                <div className="mt-5">

                  <label className="mb-2 block text-sm font-semibold">
                    Confirm New Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="password"
                      placeholder="Confirm new password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                      })}
                      className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:border-green-500 ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : ""
                      }`}
                    />

                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}

                </div>

                {/* Change Password */}
                <button
                  type="submit"
                  className="mt-6 flex items-center gap-2 rounded-lg border border-green-500 px-6 py-3 font-semibold text-green-600 transition hover:bg-green-50 active:scale-95"
                >
                  <Lock size={18} />
                  Change Password
                </button>

              </div>

            </form>

            {/* Logout */}
            <div className="mt-10 border-t pt-8">

              <h2 className="text-xl font-bold">
                Account Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Sign out from your recruiter account.
              </p>

              {session && (<button
                type="button"
                onClick={()=>signOut()}
                className="mt-5 flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 active:scale-95"
              >
                <LogOut size={18} />
                Logout
              </button>
              )}
            </div>

          </div>

        </div>
      </main>

    </div>
  );
};

export default RecruiterProfilePage;