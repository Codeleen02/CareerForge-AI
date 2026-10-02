const Features = () => {
  const features = [
    {
      icon: "🔍",
      title: "Smart Job Search",
      description:
        "Discover internships and jobs based on company, location, skills, job type, remote opportunities, and more.",
    },
    {
      icon: "🤖",
      title: "AI Resume Review",
      description:
        "Get AI-powered feedback on your resume, including strengths, weaknesses, missing skills, grammar suggestions, and an ATS score.",
    },
    {
      icon: "✍️",
      title: "AI Cover Letter Generator",
      description:
        "Generate personalized cover letters based on the job role, company, and your skills.",
    },
    {
      icon: "🎯",
      title: "AI Job Match",
      description:
        "Understand how well your profile matches a job and discover missing skills that could improve your chances.",
    },
    {
      icon: "📄",
      title: "Resume Management",
      description:
        "Upload and manage your resume and keep your professional profile ready for applications.",
    },
    {
      icon: "❤️",
      title: "Save Opportunities",
      description:
        "Save interesting internships and jobs so you can return to them later.",
    },
    {
      icon: "📊",
      title: "Application Tracking",
      description:
        "Track your applications and monitor their status from a centralized student dashboard.",
    },
    {
      icon: "🏢",
      title: "Recruiter Portal",
      description:
        "Recruiters can create company profiles, publish jobs, manage listings, and review candidates.",
    },
    {
      icon: "📈",
      title: "Recruiter Analytics",
      description:
        "Get an overview of jobs, applications, shortlisted candidates, rejected candidates, and active listings.",
    },
  ];

  return (
    <main className="min-h-screen  text-slate-900">
      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <p className="mb-4 font-semibold text-blue-600">
          Powerful Career Tools
        </p>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold md:text-6xl">
          Everything you need to move your career forward.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          CareerForge AI combines job discovery, AI-powered career tools,
          applications, and recruiter features into one platform.
        </p>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-3xl">
                  {feature.icon}
                </div>

                <h2 className="mt-5 text-xl font-bold">
                  {feature.title}
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-3xl bg-slate-900 p-8 text-white md:p-14">
          <div className="max-w-3xl">
            <p className="font-semibold text-blue-400">
              Powered by AI
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Turn your resume into a career advantage.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              CareerForge AI analyzes your resume and helps you understand
              where you stand. Get actionable feedback, identify missing
              skills, improve your applications, and generate personalized
              cover letters.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">
          Ready to build your career?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Create your profile and start exploring opportunities that match
          your goals.
        </p>
      </section>
    </main>
  );
};

export default Features;