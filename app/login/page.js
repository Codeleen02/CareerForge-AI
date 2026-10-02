// "use client"
// import React, { useEffect, useState } from 'react'
// import { GoogleIcon, GitHubIcon, FacebookIcon, AppleIcon, LinkedInIcon, TwitterIcon } from '@/Components/icons/svg'
// import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter, useSearchParams } from 'next/navigation'
// const login = () => {
//     const { data: session, status } = useSession();
//     const router = useRouter()
//     const SearchParams = useSearchParams()
//     const role = SearchParams.get("role")
//     useEffect(() => {
//         document.title = "Login - CareerForge Login"
//         if (status === "loading") return;
//         if(!session) return;

//         if (role==="student") {
//             router.replace("/student");
//         }

//         else if(role==="recruiter"){
//             router.replace("/recruiter")
//         }
        
//         else if(role === "admin"){
//             router.replace("/admin");
//         }
//     }, [session, status, router,role]);
//     return (
//         <>
//             <div className='text-white flex flex-col justify-center items-center mt-10 container'>
//                 <h1 className='text-4xl font-bold mb-9 text-green-500'>Login to get started</h1>
//                 <div className='social-login-buttons '>
//                     <div className="flex flex-col gap-2  p-3">
//                         <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
//                             <GoogleIcon />
//                             Continue with Google
//                         </button>
//                         {/* LinkedIn */}
//                         <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
//                             <LinkedInIcon />
//                             Continue with LinkedIn
//                         </button>

//                         {/* Twitter */}
//                         <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
//                             <TwitterIcon />
//                             Continue with Twitter
//                         </button>

//                         {/* Facebook */}
//                         <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
//                             <FacebookIcon />
//                             Continue with Facebook
//                         </button>

//                         {/* GitHub */}
//                         <button onClick={() =>{  signIn("github") }}  className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
//                             <GitHubIcon />
//                             Continue with Github
//                         </button>

//                         {/* Apple */}
//                         <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
//                             <AppleIcon />
//                             Continue with Apple
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// };

// export default login

"use client"

import React, { Suspense, useEffect } from 'react'
import {
    GoogleIcon,
    GitHubIcon,
    FacebookIcon,
    AppleIcon,
    LinkedInIcon,
    TwitterIcon
} from '@/Components/icons/svg'
import { useSession, signIn } from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation'

const LoginContent = () => {
    const { data: session, status } = useSession();
    const router = useRouter()
    const SearchParams = useSearchParams()
    const role = SearchParams.get("role")

    useEffect(() => {
        document.title = "Login - CareerForge Login"

        if (status === "loading") return;
        if (!session) return;

        if (role === "student") {
            router.replace("/student");
        }
        else if (role === "recruiter") {
            router.replace("/recruiter")
        }
        else if (role === "admin") {
            router.replace("/admin");
        }
    }, [session, status, router, role]);

    return (
        <>
            <div className='text-white flex flex-col justify-center items-center mt-10 container'>
                <h1 className='text-4xl font-bold mb-9 text-green-500'>
                    Login to get started
                </h1>

                <div className='social-login-buttons'>
                    <div className="flex flex-col gap-2 p-3">

                        <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
                            <GoogleIcon />
                            Continue with Google
                        </button>

                        <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
                            <LinkedInIcon />
                            Continue with LinkedIn
                        </button>

                        <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
                            <TwitterIcon />
                            Continue with Twitter
                        </button>

                        <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
                            <FacebookIcon />
                            Continue with Facebook
                        </button>

                        <button
                            onClick={() => signIn("github")}
                            className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200"
                        >
                            <GitHubIcon />
                            Continue with Github
                        </button>

                        <button className="flex items-center gap-2 bg-white border rounded-lg shadow-md px-6 py-2 text-sm text-gray-800 hover:bg-gray-200">
                            <AppleIcon />
                            Continue with Apple
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

const Login = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    )
}

export default Login