"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { fetchUser, updateProfile } from "@/actions/useractions";

import {
  User,
  Mail,
  MapPin,
  Link as LinkIcon,
  Save,
} from "lucide-react";

import StudentSidebar from "@/Components/student/StudentSidebar";

const ProfilePage = () => {

  const { data: session, status } = useSession();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      location: "",
      github: "",
      linkedin: "",
      bio: "",
      skills: "",
      resume: "",
    },
  });

  const getdata = async () => {
    if (!session?.user?.id) return;

    try {
      console.log("Searching for:", session.user.id);

      const u = await fetchUser(session.user.id);

      if (!u) {
        console.log("User not found");
        return;
      }

      console.log("User returned from DB:", u);

      reset({
        name: u.name || "",
        email: u.email || "",
        location: u.location || "",
        github: u.github || "",
        linkedin: u.linkedin || "",
        bio: u.bio || "",
        skills: Array.isArray(u.skills)
          ? u.skills.join(", ")
          : u.skills || "",
        resume: u.resume || "",

      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getdata();
    }
  }, [session?.user?.id, status]);

  const onSubmit = async (data, e) => {
    try {
      const form = e?.target;

      if (!form || !session?.user?.id) {
        return;
      }
      console.log("SESSION:", session);
      console.log("USER ID:", session?.user?.id);
      const formData = new FormData(form);

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      console.log("Session:", session);

      const result = await updateProfile(
        formData,
        session.user.id
      );

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      await getdata();

      console.log("Session:", session);

      toast.success("🦄 Profile Updated!");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
      />

      <StudentSidebar />

      <main className="lg:ml-64">

        <div className="p-6 md:p-8">

          {/* Page Header */}

          <h1 className="text-3xl font-bold text-slate-900">
            My Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Keep your profile updated to improve your job matches.
          </p>

          {/* Profile Card */}

          <div className="mt-8 max-w-4xl rounded-xl border border-slate-200 bg-white p-6 md:p-8">

            {/* Profile Header */}

            <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-center">

              {/* Avatar */}

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-600">
                {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* User Info */}

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {session?.user?.name || "Your Name"}
                </h2>

                <p className="text-slate-500">
                  Student
                </p>
              </div>

            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="mt-8 grid gap-5 md:grid-cols-2">

                {/* Full Name */}

                <Input
                  label="Full Name"
                  placeholder="Name"
                  icon={<User size={18} />}
                  error={errors.name?.message}
                  {...register("name", {
                    required: "Name is required",
                  })}
                />

                {/* Email */}

                <Input
                  label="Email"
                  placeholder="gmail@example.com"
                  icon={<Mail size={18} />}
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {/* Location */}

                <Input
                  label="Location"
                  placeholder="Mumbai, India"
                  icon={<MapPin size={18} />}
                  error={errors.location?.message}
                  {...register("location")}
                />

                {/* GitHub */}

                <Input
                  label="GitHub Profile"
                  placeholder="github.com/username"
                  icon={<LinkIcon size={18} />}
                  error={errors.github?.message}
                  {...register("github")}
                />

                {/* LinkedIn */}

                <Input
                  label="LinkedIn Profile"
                  placeholder="linkedin.com/in/username"
                  icon={<LinkIcon size={18} />}
                  error={errors.linkedin?.message}
                  {...register("linkedin")}
                />

              </div>

              {/* About Me */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  About Me
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell recruiters about yourself..."
                  {...register("bio")}
                  className="w-full resize-none rounded-lg border border-slate-300 p-3 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />

              </div>

              {/* Skills */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Skills
                </label>

                <input
                  type="text"
                  placeholder="React, Next.js, Node.js, MongoDB"
                  {...register("skills")}
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />

              </div>

              <Input
                label="Resume"
                placeholder="Upload your resume"
                icon={<FileText size={18} />}
                error={errors.resume?.message}
                {...register("resume")}
              />

              {/* Save Button */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >

                <Save size={18} />

                {isSubmitting ? "Saving..." : "Save Changes"}

              </button>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
};


/* Reusable Input Component */

const Input = React.forwardRef(
  (
    {
      label,
      placeholder,
      icon,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-800">
          {label}
        </label>

        <div className="relative">

          {/* Icon */}

          <div className="absolute left-3 top-3 text-slate-400">
            {icon}
          </div>

          {/* Input */}

          <input
            ref={ref}
            type="text"
            placeholder={placeholder}
            {...props}
            className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none transition focus:ring-1 ${error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:border-green-500 focus:ring-green-500"
              }`}
          />

        </div>

        {/* Validation Error */}

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export default ProfilePage;

