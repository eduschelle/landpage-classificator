import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LocaleProvider } from "@/components/LocaleProvider";
import { Problem } from "@/components/Problem";
import { Roadmap } from "@/components/Roadmap";
import { SignalDemo } from "@/components/SignalDemo";
import { Team } from "@/components/Team";
import { Tech } from "@/components/Tech";
import { TokenComparison } from "@/components/TokenComparison";

export default function Home() {
  return (
    <LocaleProvider>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <SignalDemo />
        <TokenComparison />
        <Tech />
        <Roadmap />
        <Team />
        <ContactForm />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
