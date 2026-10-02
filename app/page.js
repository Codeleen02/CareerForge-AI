import Link from "next/link";
export default function Home() {
  return (
    <section className="grid grid-cols-2">
      <div className="left flex flex-col gap-7 items-center justify-center mt-20 mx-auto">
        <p className="text-5xl text-start ml-13 font-bold">Your AI - Powered Internship Search Begins Here.</p>
        <p className="text-lg ml-13  mr-19">Find AI-powers Internship search for AI-internships for students your recruiter </p>
        <div className="flex gap-5 font-bold">
          <Link href="/login?role=student" className=" border rounded border-green-900 py-3 bg-green-500 px-9 text-white">Find Interships 
            <span><br />(Student)</span>
          </Link>
          <Link href="/login?role=recruiter" className="border rounded border-green-900 px-9 py-3">Post a Job
            <span><br />(Recruiter)</span>
          </Link>
            <Link href="/login?role=admin" className=" border rounded border-green-900 py-3 bg-green-500 px-9 text-white">Admin Panel
            <span><br />(Admin)</span>
          </Link>
        </div>
      </div>
      <div className="right flex justify-center items-center">
<img className="h-100 mt-10" src="handshake.jpg" alt="handshake"/>
      </div>
    </section>
  );
}
