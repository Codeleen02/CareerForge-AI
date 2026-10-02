"use client";

import {
  Building2,
  Globe,
  MapPin,
  Save,
} from "lucide-react";

import RecruiterSidebar from "@/Components/recruiter/RecruiterSidebar";
import { recruiterCompany } from "@/actions/companyaction";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CompanyPage = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      website: "",
      location: "",
      description: "",
    },
  });
   const { data: session, status } = useSession();
useEffect(() => {
    if (status === "authenticated") {
      reset({
        name: session.user.name || "",
        website: session.user.website|| "",
        location: session.user.location || "",
        description: session.user.description || "",
      });
    }
  }, [session, status, reset]);
  const onSubmit = async (data) => {
    try{
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
        const result = await recruiterCompany(formData, session.user.id);
        
              if (result?.error) {
                alert(result.error);
                return;
              }
              toast.success("Profile updated successfully!");
        
            } catch (error) {
        
              console.error("Company Profile update error:", error);
        
              toast.error("Failed to update Company profile");
        
            }
}
  
  return (
    <div className="min-h-screen bg-slate-50">

       <ToastContainer
              position="top-right"
              autoClose={5000}
              theme="colored"
            />
      
      
      <RecruiterSidebar />

      <main className="lg:ml-64">
        <div className="p-6 md:p-8">

          <h1 className="text-3xl font-bold">
            Company Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your company's public information.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 max-w-4xl rounded-xl border bg-white p-6 md:p-8"
          >

            {/* Company Header */}

            <div className="flex items-center gap-5 border-b pb-8">

              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-green-100">

                <Building2
                  size={35}
                  className="text-green-600"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  TechCorp
                </h2>

                <p className="text-slate-500">
                  Technology & Software
                </p>

              </div>

            </div>


            {/* Company Name */}

            <div className="mt-8">

              <label className="mb-2 block text-sm font-semibold">
                Company Name
              </label>

              <input
                type="text"
                placeholder="TechCorp"
                {...register("name")}
                className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
              />

            </div>


            {/* Website */}

            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold">
                Company Website
              </label>

              <div className="relative">

                <Globe
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="https://example.com"
                  {...register("website")}
                  className="w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:border-green-500"
                />

              </div>

            </div>


            {/* Location */}

            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold">
                Location
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Mumbai, India"
                  {...register("location")}
                  className="w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none focus:border-green-500"
                />

              </div>

            </div>


            {/* About Company */}

            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold">
                About Company
              </label>

              <textarea
                rows="6"
                placeholder="Tell candidates about your company..."
                {...register("description")}
                className="w-full rounded-lg border p-3 outline-none focus:border-green-500"
              />

            </div>


            {/* Submit */}

            <button
              type="submit"
              className="mt-8 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600"
            >

              <Save size={18} />

              Save Company

            </button>

          </form>

        </div>
      </main>
    </div>
  );
};

export default CompanyPage;

