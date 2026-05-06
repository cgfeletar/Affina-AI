import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/home/CtaBand";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "What I build",
  description:
    "AI builds for boutique businesses. Five categories of work — lead capture, client experience, content, operations, and analytics — written as outcomes, scoped to ship in two to four weeks.",
  alternates: { canonical: `${SITE.url}/what-i-build` },
};

type Build = { name: string; description: string };

const CATEGORIES = [
  {
    num: "01",
    eyebrow: "Lead capture & retention",
    headline: "Never lose a lead in your DMs again.",
    body: "Every inquiry gets followed up. Every quiet regular gets a check-in. Birthday and anniversary notes go out on time, in a voice that sounds like you wrote it yourself.",
    builds: [
      {
        name: "Lead Follow-Up Automation",
        description:
          "Drafts a personal reply to every inquiry within minutes, queued for you to approve.",
      },
      {
        name: "Client Reactivation Campaign",
        description:
          "Personal notes to clients quiet for a few months, drawn from their actual treatment history.",
      },
      {
        name: "Birthday & Anniversary Outreach",
        description:
          "A note that goes out the morning of, in a voice that sounds like you.",
      },
      {
        name: "Review Request Automation",
        description:
          "A single review ask sent at the right moment in the visit cycle.",
      },
    ] as const satisfies readonly Build[],
  },
  {
    num: "02",
    eyebrow: "Client experience",
    headline: "Personal at every step, automated where it matters.",
    body: "An appointment reminder that knows it's the second annual visit. An onboarding sequence that arrives the day after booking. A phone agent that answers in your practice's voice and books real appointments after hours.",
    builds: [
      {
        name: "Appointment Reminder & Rebooking",
        description:
          "Reminders that adapt to who's coming. A different message for the lapsed client than the regular.",
      },
      {
        name: "New Client Onboarding Flow",
        description:
          "A series of touchpoints between booking and first visit so new clients arrive prepared and known.",
      },
      {
        name: "Voice Agent for Inbound Calls",
        description:
          "Answers the phone 24/7, books real appointments into your PMS, and escalates emergencies to you.",
      },
    ] as const satisfies readonly Build[],
  },
  {
    num: "03",
    eyebrow: "Content & voice",
    headline: "A consistent presence in the channels you don't have time for.",
    body: "Weekly social drafts. A monthly newsletter that pulls from what actually happened in your practice. Blog posts written from the topics you've been telling clients about for years. Drafts arrive ready for your approval.",
    builds: [
      {
        name: "Social Content Generation",
        description:
          "Weekly Instagram drafts in your voice, pulled from what's actually happening at the practice.",
      },
      {
        name: "Monthly Newsletter",
        description:
          "A monthly newsletter built from your booking data and the last month at the practice. You review, it sends.",
      },
      {
        name: "Content Calendar + Blog Drafts",
        description:
          "A monthly content calendar plus full first drafts on the topics you've been telling clients about for years.",
      },
    ] as const satisfies readonly Build[],
  },
  {
    num: "04",
    eyebrow: "Operations",
    headline: "Get the institutional knowledge out of your head.",
    body: "Internal SOPs your team can find. An intake form that does something with the data instead of sitting in a Drive folder. A searchable knowledge base for the questions new hires ask you over and over.",
    builds: [
      {
        name: "Internal SOP Documentation",
        description:
          "Your processes captured from how you actually do them, written in your team's language.",
      },
      {
        name: "Intake Form to CRM Pipeline",
        description:
          "A digital intake that flows into your client database, ready to act on before the appointment.",
      },
      {
        name: "Knowledge Base Q&A",
        description:
          "A searchable knowledge base built on your existing documents. Staff find answers without asking you.",
      },
    ] as const satisfies readonly Build[],
  },
  {
    num: "05",
    eyebrow: "Insight & data",
    headline: "Know what's actually happening in your business.",
    body: "Revenue per provider. Treatment-mix margin. Retention cohorts. The clients quietly about to lapse. The Botox or filler you'll run out of in six weeks. PMS reports are usually unreadable. This is what they should have been.",
    builds: [
      {
        name: "Reporting Dashboard",
        description:
          "The handful of numbers that actually run the business, on one screen, refreshed daily.",
      },
      {
        name: "Owner Analytics Dashboard",
        description:
          "Revenue per provider, treatment-mix margin, CAC by channel, retention cohorts. The view your PMS reports never gave you.",
      },
      {
        name: "Churn Prediction & Reactivation",
        description:
          "A predictive model that flags clients about to lapse before they ghost you, with outreach written for each one.",
      },
      {
        name: "Inventory & Consumables Forecasting",
        description:
          "Forecasts your Botox, filler, and retail use from real booking patterns. Reorders before you run out.",
      },
    ] as const satisfies readonly Build[],
  },
] as const;

const PROCESS = [
  {
    num: "01",
    title: "A free 30-minute conversation.",
    body: "We talk about where your time goes, what your clients notice, and what's been on your 'I should really fix this' list for too long.",
  },
  {
    num: "02",
    title: "A scoped proposal.",
    body: "One or two builds, a clear shipping date, a flat price. You see the spec before any work starts.",
  },
  {
    num: "03",
    title: "Build and ship.",
    body: "Two to four weeks per build. I am the only person involved, so nothing gets lost in handoffs.",
  },
  {
    num: "04",
    title: "Light handoff.",
    body: "I stay close for a few weeks after launch to make sure the build actually changes how the business runs.",
  },
] as const;

export default function WhatIBuildPage() {
  return (
    <>
      <section
        aria-labelledby="what-i-build-heading"
        className="relative overflow-hidden pb-[clamp(4rem,8vw,7rem)] pt-[var(--hero-y)]"
      >
        <Container as="div">
          <div className="grid grid-cols-1 items-end gap-6 min-[800px]:grid-cols-2 min-[800px]:gap-[clamp(2rem,5vw,5rem)]">
            <div>
              <Eyebrow>What I build</Eyebrow>
              <h1
                id="what-i-build-heading"
                className="mt-5 font-display text-display-lg font-light text-balance"
              >
                Builds that fix one{" "}
                <span className="italic text-rose-deep">specific</span> thing.
              </h1>
            </div>
            <p className="max-w-[50ch] text-lede font-light text-ink-soft">
              Every engagement starts with one bottleneck. Here are the five
              categories that usually come up, and how a build moves from
              conversation to live.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="default" aria-labelledby="categories-heading">
        <Container as="div">
          <h2 id="categories-heading" className="sr-only">
            Service categories
          </h2>
          <ol className="border-t border-line list-none">
            {CATEGORIES.map((category) => (
              <Reveal key={category.num}>
                <li className="grid grid-cols-1 items-start gap-4 border-b border-line py-10 min-[800px]:grid-cols-[80px_1fr] min-[800px]:gap-[clamp(1.5rem,4vw,3.5rem)] min-[800px]:py-[clamp(2.5rem,5vw,4rem)]">
                  <span className="font-display text-base italic text-ink-mute min-[800px]:pt-3">
                    {category.num}
                  </span>
                  <div>
                    <Eyebrow className="mb-3">{category.eyebrow}</Eyebrow>
                    <h3 className="mb-5 max-w-[28ch] font-display text-[clamp(1.5rem,2.5vw,2rem)] font-light text-ink">
                      {category.headline}
                    </h3>
                    <p className="mb-8 max-w-[58ch] text-base text-ink-soft">
                      {category.body}
                    </p>
                    <dl className="grid grid-cols-1 gap-x-10 gap-y-6 min-[800px]:grid-cols-2">
                      {category.builds.map((build) => (
                        <div key={build.name}>
                          <dt className="font-body text-base font-medium text-ink">
                            {build.name}
                          </dt>
                          <dd className="mt-1 max-w-[44ch] text-[0.9375rem] text-ink-soft">
                            {build.description}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="deep" aria-labelledby="process-heading">
        <Container as="div">
          <Reveal>
            <div className="mb-[clamp(3rem,6vw,5rem)] max-w-[50ch]">
              <Eyebrow>How a build happens</Eyebrow>
              <h2
                id="process-heading"
                className="mt-5 font-display text-display-md font-light text-balance"
              >
                From conversation to live in two to four weeks.
              </h2>
            </div>
          </Reveal>

          <ol className="grid list-none grid-cols-1 gap-x-12 gap-y-10 border-t border-line pt-10 min-[800px]:grid-cols-2">
            {PROCESS.map((step) => (
              <Reveal key={step.num}>
                <li>
                  <span className="mb-3 block font-display text-sm italic text-rose">
                    {step.num}
                  </span>
                  <h3 className="mb-3 font-display text-xl font-normal text-ink">
                    {step.title}
                  </h3>
                  <p className="max-w-[44ch] text-[0.9375rem] text-ink-soft">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
