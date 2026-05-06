import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { WhoSection } from "@/components/home/WhoSection";
import { Scenarios } from "@/components/home/Scenarios";
import { Approach } from "@/components/home/Approach";
import { Testimonial } from "@/components/home/Testimonial";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
};

export default function Home() {
  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
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
