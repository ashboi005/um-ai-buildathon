"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/components/context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { setUser } = useUser(); // Optional: If you want to store user data in context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // IMPORTANT: credentials: "include" so the browser accepts/sends cookies
      const res = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // <-- crucial for sending/receiving session cookies
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Login error response:", data);
        setError(data.message || "Invalid email or password.");
        return;
      }

      // Login successful: The server should have set a session cookie in the response
      console.log("Login successful!", data);

      // If the server returned user info, optionally store it in context
      if (data.user) {
        setUser(data.user);
      }

      // Redirect to dashboard or wherever you want
      router.push("/dashboard");

    } catch (err) {
      console.log("Login network error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 space-y-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
