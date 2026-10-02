"use server"
import Company from "@/models/Company"
import connectDb from "@/db/connectDb"

export const recruiterCompany = async (data,userId) => {
    try {
        await connectDb()
        if (!userId) {
            return {
                error: "UserId is required"
            }
        }
        console.log("SERVER DATA:", data);
        console.log("SERVER USER ID:", userId);
        const company = await Company.create({
            name: data.get("name"),
            website: data.get("website"),
            location: data.get("location"),
            description: data.get("description"), 
            recruiter: userId,
        })
        return{
            success:true
        }
    } catch (error) {
       console.error("Error in company profile creation",error)

       return{
        error:error.message || "Failed to create job"
       }
    }
}