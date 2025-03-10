import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Hero Section takes space and centers itself */}
      <div className="flex-grow flex items-center justify-center">
        <HeroSection />
      </div>

      {/* Footer sticks to bottom, naturally positioned */}
      <Footer />
    </main>
  );
}
