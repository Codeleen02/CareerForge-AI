import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, profile }) {
      try {
        await connectDb();

        if (!user.email) {
          console.log("No email received from GitHub");
          return false;
        }

        const existingUser = await User.findOne({
          email: user.email,
        });


        if (existingUser) {
          console.log(
            "Existing user found:",
            existingUser._id.toString()
          );

          console.log(
            "Existing role:",
            existingUser.role
          );

          return true;
        }
        const githubUsername =
          profile?.login ||
          user.name ||
          user.email.split("@")[0];

        const newUser = await User.create({
          email: user.email,

          // GitHub display name
          name: user.name || githubUsername,

          // GitHub username
          username: githubUsername,

          // New users start as students
          role: "student",
        });

        console.log(
          "New student created:",
          newUser._id.toString()
        );

        return true;

      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }

    },

    async jwt({ token, user }) {
      try {
        await connectDb();

        if (user?.email) {
          const dbUser = await User.findOne({
            email: user.email,
          }).lean();

          if (dbUser) {
            token.id = dbUser._id.toString();
            token.email = dbUser.email;
            token.name = dbUser.name;
            token.username = dbUser.username;
            token.role = dbUser.role;
          }
        }

        return token;

      } catch (error) {
        console.error("JWT error:", error);
        return token;
      }
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.role = token.role;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };