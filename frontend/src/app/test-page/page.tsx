/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ Import router for redirect

export default function TakeTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // ✅ Dark Mode
  const router = useRouter(); // ✅ Initialize router

  // ✅ Apply dark mode to document like footer does
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // ✅ Load test data from localStorage on mount
  useEffect(() => {
    const storedTest = localStorage.getItem("currentTest");
    if (storedTest) {
      const test = JSON.parse(storedTest);
      console.log("✅ Loaded Test:", test);
      setQuestions(test.test.questions || []);
    } else {
      alert("No test found. Please generate a test first.");
    }
  }, []);

  const handleAnswer = (option: string) => {
    setAnswers({ ...answers, [currentQuestion]: option });

    const correctAnswer = questions[currentQuestion].answer;
    setIsCorrect(option === correctAnswer);
    setShowFeedback(true); // Show feedback after answer selection
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setIsCorrect(null);
    } else {
      alert("Test submitted successfully! ✅");
      console.log("Submitted Answers:", answers);
      
      // ✅ Redirect to dashboard
      router.push("/dashboard");
    }
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    setShowFeedback(false);
    setIsCorrect(null);
  };

  // ✅ Handle empty state gracefully
  if (questions.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">No questions available. Please generate a test first.</h2>
      </div>
    );
  }

  const questionData = questions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* ✅ Header with Dark Mode Toggle */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">📝 Take a Test</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full border"
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </button>
      </div>

      <p className="text-muted-foreground">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      {/* ✅ Question Card */}
      <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-xl font-semibold mb-4">{questionData.question}</h2>

        {/* ✅ Options */}
        <div className="space-y-3">
          {questionData.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`block w-full text-left p-3 border rounded-md ${
                answers[currentQuestion] === option
                  ? "border-blue-500 bg-blue-100 dark:bg-blue-800"
                  : "border-gray-300 dark:border-gray-700"
              } hover:bg-gray-200 dark:hover:bg-gray-800 transition`}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>

        {/* ✅ Feedback */}
        {showFeedback && (
          <div
            className={`mt-4 p-3 rounded-md ${
              isCorrect
                ? "bg-green-100 text-green-700 dark:bg-green-900"
                : "bg-red-100 text-red-700 dark:bg-red-900"
            }`}
          >
            {isCorrect ? "✅ Correct Answer!" : "❌ Incorrect Answer!"}
          </div>
        )}

        {/* ✅ Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!showFeedback}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? "Submit Test" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
