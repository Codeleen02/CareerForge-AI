"use server";
import User from "@/models/User"
import connectDb from "@/db/connectDb";

export const fetchUser = async (id) => {
  try {
    await connectDb();

    const user = await User.findById(id).lean();

    if (!user) {
      return null;
    }

    return JSON.parse(JSON.stringify(user));

  } catch (error) {
    console.error("Fetch user error:", error);
    return null;
  }
};


export const updateProfile = async (data, id) => {
  try {
    await connectDb();

    const currentUser = await User.findById(id);

    if (!currentUser) {
      return {
        error: "User not found",
      };
    }

    const updatedData = {
      username: data.get("name"),
      email: data.get("email"),
      location: data.get("location"),
      github: data.get("github"),
      linkedin: data.get("linkedin"),
      bio: data.get("bio"),
      skills: data.get("skills"),
      resume:data.get("resume")
    };

    if (updatedData.skills) {
      updatedData.skills = updatedData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    await User.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    );

    return {
      success: true,
    };

  } catch (error) {
    console.error("Update profile error:", error);

    return {
      error: error.message || "Failed to update profile",
    };
  }
};

export const updateAdminProfile = async (data) => {
  try {
    await connectDb();

    const name = data.get("name");
    const email = data.get("email");
    if (!name || !email) {
      return { error: "Name and Email are required." };
    }

    const updatedAdmin = await User.findOneAndUpdate(
      { role: "admin" },
      { name, email },
      { new: true }
    );

    if (!updatedAdmin) {
      return { error: "Admin not found in database" };
    }

    return { success: true };
  } catch (error) {
    console.error("Update admin profile error:", error);
    return {
      error: error.message || "Failed to update admin profile",
    };
  }
};

export const recruiterProfile = async (data) => {
  try {
    await connectDb();
    const name = data.get("name")
    const email = data.get("email")
    const position = data.get("position")
    const phone = data.get("phone")
    
    if(!name || !email || !position || !phone){
      return {error: "Name , email , position, phone required"}
    }

    const updatedRecruiter = await User.findOneAndUpdate(
      {role:"recruiter"},
      {name,email,position,phone},
      {new:true}
    );
    if(!updatedRecruiter){
      return {error: "Recruiter not found"}
    }
    return {
      success:true
    };
  } catch (error){
   console.error("Recruiter update profile error",error)
  
  return{
    error:error.message || "Failed to update Recruiter Profile",
  }
  };
}