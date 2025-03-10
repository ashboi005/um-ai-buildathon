"use client";

import { useState } from "react";

export default function TakeTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
    },
    {
      id: 2,
      question: "Who developed the theory of relativity?",
      options: ["Newton", "Einstein", "Tesla", "Bohr"],
    },
    {
      id: 3,
      question: "What is H2O?",
      options: ["Oxygen", "Hydrogen", "Water", "Helium"],
    },
  ];

  const handleAnswer = (option: string) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert("Test submitted successfully! ✅");
      console.log("Answers:", answers);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">📝 Take a Test</h1>
      <p className="text-muted-foreground">Select the correct answer for each question.</p>

      <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-xl font-semibold mb-4">
          Q{currentQuestion + 1}: {questions[currentQuestion].question}
        </h2>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`block w-full text-left p-3 border rounded-md ${
                answers[currentQuestion] === option
                  ? "border-blue-500 bg-blue-100 dark:bg-blue-800"
                  : "border-gray-300 dark:border-gray-700"
              } hover:bg-gray-200 dark:hover:bg-gray-800 transition`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            {currentQuestion === questions.length - 1 ? "Submit Test" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
