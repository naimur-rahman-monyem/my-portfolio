"use client";

import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Download } from "lucide-react";

const INSIGHTS = [
  {
    title: "A Survey-Based Study on Cybersecurity Awareness Among University Students Using ML for Risk Prediction",
    date: "Ongoing",
    slug: "cybersecurity-awareness-ml-prediction",
    description: "Analyzing student behavioral data to predict security risks using supervised machine learning models.",
    paperUrl: "/papers/cybersecurity-awareness.pdf", 
  },
  {
    title: "A Multi-Modal Machine Learning Approach for Phishing Website Detection Using URL and Visual Features",
    date: "2026-01-03",
    slug: "phishing-detection-ml",
    description: "Research on combining URL analysis and computer vision for security.",
    paperUrl: "/papers/phishing-detection.pdf",
  }
];

export default function InsightsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="mx-auto max-w-2xl px-6 py-12">
      <BlurFade delay={0.1}>
        <div className="mb-8">
          {/* Updated Title here */}
          <h1 className="text-3xl font-bold tracking-tighter">Research Papers</h1>
          <p className="text-muted-foreground mt-2">
            Analytical deep-dives into data patterns, machine learning, and cybersecurity.
          </p>
        </div>
      </BlurFade>

      <div className="space-y-10">
        {INSIGHTS.map((post, idx) => {
          const isOngoing = post.date === "Ongoing";

          return (
            <BlurFade key={post.slug} delay={0.2 + idx * 0.05}>
              <div className="flex flex-col space-y-2 group">
                <span className="text-sm font-mono text-muted-foreground">0{idx + 1}.</span>
                
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{post.date}</p>
                  </div>

                  <a
                    href={isOngoing ? "#" : post.paperUrl}
                    onClick={(e) => {
                      if (isOngoing) {
                        e.preventDefault();
                        alert("This research is still ongoing. The paper will be available for download once completed!");
                      }
                    }}
                    download={!isOngoing}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-border rounded-full transition-colors shrink-0 ${
                      isOngoing 
                        ? "cursor-help opacity-70 hover:bg-muted" 
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Download className="size-3" />
                    {isOngoing ? "Coming Soon" : "Download PDF"}
                  </a>
                </div>

                <p className="text-sm text-muted-foreground/80 mt-2 leading-relaxed italic">
                  {post.description}
                </p>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}