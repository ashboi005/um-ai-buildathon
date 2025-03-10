"use client";

import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-20 sm:py-32 md:py-36 px-6",
        "fade-bottom overflow-hidden pb-0"
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-14 pt-12 sm:gap-20">
        <div className="flex flex-col items-center gap-8 text-center sm:gap-12">
          

          {/* Title */}
          <h1 className="relative z-10 inline-block bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-5xl font-extrabold leading-tight text-transparent drop-shadow-2xl sm:text-7xl sm:leading-tight md:text-8xl md:leading-tight">
            Upskill Quiz Maker
          </h1>

          {/* Description */}
          <p className="text-lg max-w-3xl text-muted-foreground leading-relaxed sm:text-xl">
            Instantly generate personalized tests using Google&apos;s Gemini AI and track all your test performances. 
            Whether you&apos;re preparing for exams or practicing for improvement — we&apos;ve got you covered.
          </p>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              asChild
              className="rounded-full px-8 py-5 text-base shadow-lg"
            >
              <a href="/login" className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                Login
              </a>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="rounded-full px-8 py-5 text-base"
            >
              <a href="/signup" className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Sign Up
              </a>
            </Button>
          </div>
        </div>

        {/* Mockup Box (Feature Highlight) */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="rounded-3xl border border-muted/40 bg-muted/20 p-8 sm:p-12 shadow-2xl backdrop-blur-md hover:shadow-3xl transition-all duration-300 ease-in-out">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
              ✨ What You Can Do
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <p className="text-foreground font-semibold text-xl">
                  🎯 AI-Based Test Generator
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Create fully customized tests using Gemini AI — tailored to your subjects, topics, and difficulty levels.
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-foreground font-semibold text-xl">
                  📚 Track Test History
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Access all your past tests, view detailed scores, and monitor progress over time for smarter learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
