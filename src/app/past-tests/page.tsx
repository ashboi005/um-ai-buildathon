"use client";

import { useEffect, useState } from "react";

interface TestReport {
  id: number;
  name: string;
  score: number;
  date: string;
}

export default function PastTestsPage() {
  const [testReports, setTestReports] = useState<TestReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch test reports from backend
  useEffect(() => {
    const fetchTestReports = async () => {
      setLoading(true);
      const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/ai/my_tests`;

      console.log("Fetching tests from:", API_URL); // ✅ Debugging log

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Test Reports Fetched:", data);

          if (data.tests && Array.isArray(data.tests)) {
            setTestReports(data.tests); // ✅ Extract tests array
          } else {
            console.error("❌ Invalid response format:", data);
            setError("Invalid data received from server.");
          }
        } else {
          const errorData = await response.json();
          console.error("❌ Failed to fetch tests:", errorData);
          setError(errorData.message || "Failed to fetch test reports.");
        }
      } catch (error) {
        console.error("❌ Error fetching test reports:", error);
        setError("An unexpected error occurred while fetching tests.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestReports();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">📊 Your Test Reports</h1>
      <p className="text-muted-foreground">
        Here are all the tests you have taken so far.
      </p>

      {loading && <p>Loading test reports...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && testReports.length === 0 && (
        <p className="text-gray-500">No tests found. Start taking tests now!</p>
      )}

      {testReports.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Test Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Date
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {testReports.map((test) => (
                <tr key={test.id}>
                  <td className="px-6 py-4">{test.name}</td>
                  <td className="px-6 py-4">{test.score}%</td>
                  <td className="px-6 py-4">{test.date}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`/student-dashboard/past-tests/${test.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Report →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
