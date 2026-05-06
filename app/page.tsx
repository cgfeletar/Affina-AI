import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { WhoSection } from "@/components/home/WhoSection";
import { Scenarios } from "@/components/home/Scenarios";
import { Approach } from "@/components/home/Approach";
import { Testimonial } from "@/components/home/Testimonial";
import { CtaBand } from "@/components/home/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhoSection />
      <Scenarios />
      <Approach />
      <Testimonial />
      <CtaBand />
    </>
  );
}
