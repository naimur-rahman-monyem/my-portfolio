"use client";

import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";

const INSIGHTS = [
 {
    title: "A Survey-Based Study on Cybersecurity Awareness Among University Students Using ML for Risk Prediction",
    date: "Ongoing",
    slug: "cybersecurity-awareness-ml-prediction",
    description: "Analyzing student behavioral data to predict security risks using supervised machine learning models."
  },
   {
    title: "A Multi-Modal Machine Learning Approach for Phishing Website Detection Using URL and Visual Features",
    date: "2026-01-03",
    slug: "phishing-detection-ml",
    description: "Research on combining URL analysis and computer vision for security."
  },
   {
    title: "Predicting Market Trends: A Regression Analysis",
    date: "2025-08-15",
    slug: "market-trends-analysis",
    description: "Using Python and Scikit-learn to forecast e-commerce growth."
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
          <h1 className="text-3xl font-bold tracking-tighter">Insights</h1>
          <p className="text-muted-foreground mt-2">
            Analytical deep-dives into data patterns and machine learning.
          </p>
        </div>
      </BlurFade>

      <div className="space-y-8">
        {INSIGHTS.map((post, idx) => (
          <BlurFade key={post.slug} delay={0.2 + idx * 0.05}>
            {/* Replaced Link with a div and removed hover underline effects */}
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-mono text-muted-foreground">0{idx + 1}.</span>
              <h2 className="text-xl font-semibold">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground">{post.date}</p>
              {/* Added description display since there is no click-through page anymore */}
              <p className="text-sm text-muted-foreground/80 mt-1 italic">
                {post.description}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}