"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react";
import Link from "next/link";

function Footer() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Updated</h2>
            <p className="mb-6 text-muted-foreground">
              Get the latest test series, study tips, and AI-generated practice sets directly to your inbox.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Your email address"
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>

        

          

          {/* Social & Theme Toggle */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Connect with Us</h3>
            <div className="mb-6 flex space-x-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <TooltipProvider key={label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Icon className="h-4 w-4" />
                        <span className="sr-only">{label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            {/* Dark Mode Switch */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">Toggle dark mode</Label>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 AI Study Companion. All rights reserved.</p>
          <nav className="flex gap-4 text-sm">
          
            <Link href="/login" className="transition-colors hover:text-primary">Login</Link>
            <Link href="/signup" className="transition-colors hover:text-primary">Sign Up</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
