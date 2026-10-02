"use client";

import React, { useEffect } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  Lock,
  Save,
  LogOut,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import { updateAdminProfile } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "@/Components/admin/AdminSidebar";

const AdminProfilePage = () => {

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: {
      errors: profileErrors,
      isSubmitting: isProfileSubmitting,
    },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      resetProfile({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session, status, resetProfile]);

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    reset: resetPassword,
    formState: {
      errors: passwordErrors,
      isSubmitting: isPasswordSubmitting,
    },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (data) => {
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

      const result = await updateAdminProfile(formData, session.user.id);

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


  const onPasswordSubmit = async (data) => {

    try {

      console.log("Password Data:", data);

      toast.success("Password changed successfully!");

      resetPassword();

    } catch (error) {

      console.error("Password change error:", error);

      toast.error("Failed to change password");

    }

  };


  const handleLogout = async () => {

    await signOut({
      callbackUrl: "/login",
    });

  };


  return (

    <div className="min-h-screen bg-slate-50">

      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
      />

      <AdminSidebar />

      <main className="lg:ml-64">

        <div className="p-6 md:p-8">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              My Profile
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your administrator account and security settings.
            </p>

          </div>

          <div className="mt-8 max-w-4xl rounded-xl border border-slate-200 bg-white p-6 md:p-8">

            <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

                <User
                  size={40}
                  className="text-green-600"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Admin User
                </h2>

                <p className="mt-1 text-slate-500">
                  admin@careerforge.ai
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-green-600">

                  <ShieldCheck size={17} />

                  Administrator

                </div>

              </div>

            </div>

            <form
              onSubmit={handleProfileSubmit(onProfileSubmit)}
              className="mt-8"
            >


              <h2 className="text-xl font-bold text-slate-900">
                Personal Information
              </h2>

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...registerProfile("name", {
                      required: "Full name is required",
                    })}
                    className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none transition focus:ring-1 ${profileErrors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-green-500 focus:ring-green-500"
                      }`}
                  />

                </div>

                {profileErrors.name && (

                  <p className="mt-1 text-sm text-red-500">
                    {profileErrors.name.message}
                  </p>

                )}

              </div>

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="email"
                    placeholder="admin@example.com"
                    {...registerProfile("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none transition focus:ring-1 ${profileErrors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-green-500 focus:ring-green-500"
                      }`}
                  />

                </div>

                {profileErrors.email && (

                  <p className="mt-1 text-sm text-red-500">
                    {profileErrors.email.message}
                  </p>

                )}

              </div>

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Account Role
                </label>

                <div className="relative">

                  <ShieldCheck
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="text"
                    value="Administrator"
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-slate-300 bg-slate-100 py-2.5 pl-10 pr-3 text-slate-500"
                  />

                </div>

              </div>


              <button
                type="submit"
                disabled={isProfileSubmitting}
                className="mt-6 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >

                <Save size={18} />

                {isProfileSubmitting
                  ? "Saving..."
                  : "Save Changes"
                }

              </button>

            </form>

            <form
              onSubmit={handlePasswordSubmit(onPasswordSubmit)}
              className="mt-10 border-t border-slate-200 pt-8"
            >

              <h2 className="text-xl font-bold text-slate-900">
                Security
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your administrator account password.
              </p>

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
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
                    {...registerPassword("currentPassword", {
                      required: "Current password is required",
                    })}
                    className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:ring-1 ${passwordErrors.currentPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-green-500 focus:ring-green-500"
                      }`}
                  />

                </div>

                {passwordErrors.currentPassword && (

                  <p className="mt-1 text-sm text-red-500">
                    {passwordErrors.currentPassword.message}
                  </p>

                )}

              </div>


              {/* =========================
                  NEW PASSWORD
              ========================== */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
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
                    {...registerPassword("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:ring-1 ${passwordErrors.newPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-green-500 focus:ring-green-500"
                      }`}
                  />

                </div>

                {passwordErrors.newPassword && (

                  <p className="mt-1 text-sm text-red-500">
                    {passwordErrors.newPassword.message}
                  </p>

                )}

              </div>


              {/* =========================
                  CONFIRM PASSWORD
              ========================== */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
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
                    {...registerPassword("confirmPassword", {
                      required: "Please confirm your new password",

                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                    className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:ring-1 ${passwordErrors.confirmPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-green-500 focus:ring-green-500"
                      }`}
                  />

                </div>

                {passwordErrors.confirmPassword && (

                  <p className="mt-1 text-sm text-red-500">
                    {passwordErrors.confirmPassword.message}
                  </p>

                )}

              </div>


              {/* =========================
                  CHANGE PASSWORD
              ========================== */}

              <button
                type="submit"
                disabled={isPasswordSubmitting}
                className="mt-6 flex items-center gap-2 rounded-lg border border-green-500 px-6 py-3 font-semibold text-green-600 transition hover:bg-green-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >

                <Lock size={18} />

                {isPasswordSubmitting
                  ? "Changing..."
                  : "Change Password"
                }

              </button>

            </form>


            {/* =================================================
                LOGOUT
            ================================================== */}

            <div className="mt-10 border-t border-slate-200 pt-8">

              <h2 className="text-xl font-bold text-slate-900">
                Account Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Sign out from your administrator account.
              </p>


              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 active:scale-95"
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

};

export default AdminProfilePage;
