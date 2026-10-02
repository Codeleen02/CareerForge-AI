const About = () => {
  return (
    <main className="min-h-screen bg-[#D4FAD7]  text-slate-900">
      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <p className="mb-4 font-semibold text-green-600">
          About CareerForge AI
        </p>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
          Helping students find internships smarter.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          CareerForge AI is an AI-powered internship and job platform designed
          to help students discover opportunities, improve their resumes, and
          build stronger career profiles.
        </p>
      </section>

      {/* Mission */}
      <section className="bg-[#D4FAD7] px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold">
              Built for the next generation of professionals.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Finding the right internship can be difficult. Students often
              struggle to discover relevant opportunities, understand whether
              they are qualified, and present themselves effectively to
              recruiters.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              CareerForge AI brings job discovery, applications, resume
              insights, and AI-powered career tools together in one platform.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">Our Mission</h3>

            <p className="mt-4 leading-7 text-slate-600">
              To make the internship and job search process simpler, smarter,
              and more accessible for students while helping recruiters
              discover promising talent.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              How CareerForge AI works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              A simple workflow designed to help you move from searching for
              opportunities to becoming career-ready.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Build your profile",
                text: "Create your professional profile and showcase your skills, education, and experience.",
              },
              {
                number: "02",
                title: "Improve your resume",
                text: "Use AI-powered insights to identify strengths, weaknesses, and areas for improvement.",
              },
              {
                number: "03",
                title: "Discover opportunities",
                text: "Search and explore internships and jobs that match your interests and skills.",
              },
              {
                number: "04",
                title: "Apply with confidence",
                text: "Apply to relevant opportunities and track your applications from one dashboard.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border border-slate-200 p-6"
              >
                <span className="text-sm font-bold text-blue-600">
                  {item.number}
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 px-6 py-20 text-center text-white">
        <h2 className="text-3xl font-bold">
          Your career journey starts here.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Build your profile, discover opportunities, and take the next step
          toward your career.
        </p>
      </section>
    </main>
  );
};

export default About;