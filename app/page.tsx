import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { WhatYouCanDo } from "@/components/sections/WhatYouCanDo";
import { CommunitySection } from "@/components/community/CommunitySection";
import { WhoIsFor } from "@/components/sections/WhoIsFor";
import { AreasOfInterest } from "@/components/sections/AreasOfInterest";
import { IdeaSection } from "@/components/sections/IdeaSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-between selection:bg-white selection:text-black">
      <Navbar />
      <div className="flex-1">
        <HeroSection />
        <ManifestoSection />
        <WhatYouCanDo />
        <CommunitySection />
        <WhoIsFor />
        <AreasOfInterest />
        <IdeaSection />
        <PrinciplesSection />
        <FinalCTA />
      </div>
      <Footer />
    </main>
  );
}
