"use client";

import {
    FileText,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    ArrowRight,
} from "lucide-react";

import StudentSidebar from "@/Components/student/StudentSidebar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUserResume, reviewResume } from "@/actions/Applicationaction";
const AIResumeReviewPage = () => {
    const [resumeUrl, setResumeUrl] = useState("");
    const [resumeLoading, setResumeLoading] = useState(true);
    const [review, setReview] = useState("");
    const [reviewLoading, setReviewLoading] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const getResume = async () => {
            try {
                if (!session?.user?.id) return;

                const result = await fetchUserResume(
                    session.user.id
                );

                console.log("Resume returned:", result);

                if (result?.success) {
                    setResumeUrl(result.resume);
                } else {
                    setResumeUrl("");
                }
            } catch (error) {
                console.error("Failed to get resume:", error);
            } finally {
                setResumeLoading(false);
            }
        };

        if (session?.user?.id) {
            getResume();
        }
    }, [session?.user?.id]);

    const ReviewResumehandle = async () => {
        try {
            if (!session?.user?.id) {
                return;
            }

            setReviewLoading(true);
            setReview("");

            const result = await reviewResume(
                session.user.id
            );

            console.log("AI review:", result);

            if (result?.success) {
                setReview(result.review);
            } else {
                setReview(
                    result?.error || "Failed to review resume."
                );
            }
        } catch (error) {
            console.error("Resume review failed:", error);
            setReview(
                "Something went wrong while reviewing the resume."
            );
        } finally {
            setReviewLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-slate-50">

            <StudentSidebar />

            <main className="lg:ml-64">
                <div className="p-6 md:p-8">

                    {/* Header */}

                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <Sparkles
                                    size={24}
                                    className="text-green-600"
                                />
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold">
                                    AI Resume Review
                                </h1>

                                <p className="mt-1 text-slate-500">
                                    Get AI-powered feedback to improve your resume.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Grid */}

                    <div className="mt-8 grid gap-6 lg:grid-cols-2">

                        {/* Resume Section */}

                        <div className="rounded-xl border bg-white p-6">

                            <h2 className="text-lg font-bold">
                                Your Resume
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                AI will review the resume you currently have uploaded.
                            </p>

                            {/* Resume Card */}

                            <div className="mt-6 flex items-center justify-between rounded-lg border bg-slate-50 p-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-100">
                                        <FileText
                                            size={22}
                                            className="text-red-500"
                                        />
                                    </div>

                                    <div>
                                        {resumeLoading ? (
                                            <p className="text-sm text-slate-500">
                                                Loading resume...
                                            </p>
                                        ) : resumeUrl ? (
                                            <div>
                                                <p className="font-semibold">
                                                    Current Resume
                                                </p>

                                                <a
                                                    href={resumeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-green-600 hover:underline"
                                                >
                                                    View Resume
                                                </a>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-slate-500">
                                                No resume uploaded
                                            </p>
                                        )}

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    className="text-sm font-semibold text-green-600 hover:underline"
                                >
                                    View
                                </button>

                            </div>

                            {/* Review Options */}

                            <div className="mt-6">

                                <label className="mb-2 block text-sm font-semibold">
                                    Review Focus
                                </label>

                                <select
                                    className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-green-500"
                                    defaultValue="overall"
                                >
                                    <option value="overall">
                                        Overall Resume Review
                                    </option>

                                    <option value="ats">
                                        ATS Compatibility
                                    </option>

                                    <option value="skills">
                                        Skills & Keywords
                                    </option>

                                    <option value="experience">
                                        Experience & Projects
                                    </option>

                                </select>

                            </div>

                            {/* Target Job */}

                            <div className="mt-5">

                                <label className="mb-2 block text-sm font-semibold">
                                    Target Job
                                    <span className="ml-1 font-normal text-slate-400">
                                        (Optional)
                                    </span>
                                </label>

                                <textarea
                                    rows={5}
                                    placeholder="Paste the job description here to get a role-specific review..."
                                    className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-green-500"
                                />

                            </div>

                            {/* Review Button */}

                            <button onClick={ReviewResumehandle}
                                type="button"
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
                            >
                                <Sparkles size={18} />
                                Review My Resume
                            </button>

                        </div>
                        {review && (
                            <div className="mt-6 rounded-xl border bg-white p-6">
                                <h2 className="mb-4 text-xl font-bold">
                                    Resume Review
                                </h2>

                                <div className="max-h-[500px] overflow-y-auto pr-2">
                                    <div className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                        {review}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </main>

        </div>
    );
};

export default AIResumeReviewPage;

