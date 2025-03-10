/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { UserCircle2, History, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "medium",
    num_questions: 5,
  });
  const [loading, setLoading] = useState(false);

  // ✅ Handle AI Test Generation with error handling
  const handleGenerateTest = async (e: any) => {
    e.preventDefault();
    setLoading(true);
  
    const API_URL = process.env.NEXT_PUBLIC_API_URL + "/ai/generate_test";
  
    console.log("🚀 Submitting Test Generation Request with Data:", formData);
    console.log("🌐 API URL:", API_URL);
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // ✅ Correct JSON format
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Test Generated Successfully:", data);
  
        if (data.test_id) {
          console.log("➡️ Redirecting to Test ID:", data.test_id);
          router.push(`/student-dashboard/take-test/${data.test_id}`); // Redirect
        } else {
          console.error("❌ No test_id returned:", data);
          alert("Test generated but no test ID returned.");
        }
      } else {
        const errorData = await response.json();
        console.error("❌ Failed API Response:", errorData);
        alert(`Failed to generate test: ${errorData.message || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error("❌ Error during API call:", error);
      alert("An unexpected error occurred while generating the test.");
    } finally {
      setLoading(false);
    }
  };
  

  const dashboardItems: BentoItem[] = [
    {
      title: "Welcome, User!",
      description:
        "Get started by exploring available tests, checking your past scores, and setting study goals.",
      icon: <UserCircle2 className="w-4 h-4 text-blue-500" />,
      status: "Active",
      tags: ["Profile", "Account"],
      cta: "Go to Profile →",
    },
    {
      title: "View Past Tests",
      meta: `Tests Taken`,
      description:
        "See a detailed history of all your past tests, scores, and feedback to track your growth.",
      icon: <History className="w-4 h-4 text-yellow-500" />,
      status: "View",
      tags: ["History", "Reports"],
      cta: "See All →",
    },
    {
      title: "Average Test Score",
      meta: `Average`,
      description:
        "Your current average score based on all the tests you've taken so far. Keep improving!",
      icon: <BarChart3 className="w-4 h-4 text-purple-500" />,
      status: "Updated",
      tags: ["Performance", "Analytics"],
      cta: "View Insights →",
    },
  ];

  return (
    <div className="w-full space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">🎓 Dashboard</h1>

      {/* ✅ AI Test Generator Card */}
      <div className="border rounded-xl p-6 bg-gray-100 dark:bg-gray-900 space-y-4 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Take a New AI-Generated Test
        </h2>

        {!showForm ? (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            Generate Test
          </Button>
        ) : (
          <form onSubmit={handleGenerateTest} className="space-y-4">
            {/* Topic Field */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Topic</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="Enter topic (e.g., Physics)"
                required
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Difficulty Field */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Number of Questions Field */}
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-300">
                Number of Questions
              </label>
              <input
                type="number"
                value={formData.num_questions}
                min={1}
                onChange={(e) =>
                  setFormData({ ...formData, num_questions: parseInt(e.target.value) })
                }
                required
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Generating..." : "Generate and Start Test"}
            </Button>
          </form>
        )}
      </div>

      {/* ✅ Bento Grid for other dashboard features */}
      <BentoGrid items={dashboardItems} />
    </div>
  );
}
