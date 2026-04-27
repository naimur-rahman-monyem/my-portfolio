/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import BlurFade from "@/components/magicui/blur-fade"; 
import { Icons } from "@/components/icons"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";


const BLUR_FADE_DELAY = 0.04;

export function HeroDescription() {
  const lines = DATA.description.split("\n");
  const [index, setIndex] = useState(0);

  // Automatically cycle through lines
  useEffect(() => {
    if (index >= lines.length - 1) return; // Stop at the last line
    
    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 3000); // Change line every 3 seconds

    return () => clearTimeout(timer);
  }, [index, lines.length]);

  return (
    <div className="h-[60px] md:h-[80px] flex items-center"> 
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          // Entrance
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          // Exit
          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl font-sans"
        >
          {lines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
function CyclingDescription({ description }: { description: string }) {
  const lines = description.split("\n");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Moves to next line every 3 seconds
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length); 
    }, 3000);
    return () => clearInterval(timer);
  }, [lines.length]);

  return (
    <div className="h-12 md:h-16 flex items-center"> {/* Fixed height to prevent jumping */}
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
        >
          {lines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
{/* Hero Section */}
{/* Hero Section */}
<section id="hero">
  <div className="mx-auto w-full max-w-2xl space-y-8">
    <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between items-center md:items-start">
      
      {/* Left Side: Name and Cycling Description */}
      <div className="gap-2 flex flex-col order-2 md:order-1 flex-1">
        <BlurFadeText
          delay={BLUR_FADE_DELAY}
          className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
          yOffset={8}
          text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
        />
        
        {/* The one-by-one cycling text we just added */}
        <CyclingDescription description={DATA.description} />
      </div>

      {/* Right Side: Your Picture Section */}
      <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
            <AvatarImage 
              alt={DATA.name} 
              src={DATA.avatarUrl} 
              className="object-cover"
            />
            <AvatarFallback>{DATA.initials}</AvatarFallback>
          </Avatar>
        </motion.div>
      </BlurFade>

    </div>
  </div>
</section>
      {/* About Section */}
<section id="about">
  <div className="flex min-h-0 flex-col gap-y-4">
    <BlurFade delay={BLUR_FADE_DELAY * 3}>
      <h2 className="text-xl font-bold">About</h2>
    </BlurFade>
    
    <BlurFade delay={BLUR_FADE_DELAY * 4}>
      <motion.div
        // 1. Smooth entrance animation
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1] // Custom "Expo" ease for a premium feel
        }}
        className="relative group"
      >
        {/* 2. Prose container with enhanced styling */}
        <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{DATA.summary}</Markdown>
        </div>

        {/* 3. A subtle decorative accent line that animates on hover */}
        <motion.div 
          className="absolute -left-4 top-0 bottom-0 w-[2px] bg-primary/20 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ delay: BLUR_FADE_DELAY * 5, duration: 1 }}
        />
      </motion.div>
    </BlurFade>
  </div>
</section>

     {/* Education Section */}
<section id="education">
  <div className="flex min-h-0 flex-col gap-y-6">
    <BlurFade delay={BLUR_FADE_DELAY * 7}>
      <h2 className="text-xl font-bold">Education</h2>
    </BlurFade>
    
    <div className="flex flex-col gap-8">
      {DATA.education?.map((education, index) => (
        <BlurFade
          key={education.school}
          // The index * 0.1 ensures they appear one-after-another
          delay={BLUR_FADE_DELAY * 8 + index * 0.1}
          yOffset={10}
        >
          <motion.div
            whileHover={{ x: 5 }} // Subtle slide effect on hover
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href={education.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-3 justify-between group"
            >
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                {/* School Logo with a subtle scale-up on hover */}
                <div className="relative flex-none overflow-hidden rounded-full ring-2 ring-border transition-all duration-300 group-hover:ring-primary/50 group-hover:shadow-md">
                  {education.logoUrl ? (
                    <img
                      src={education.logoUrl}
                      alt={education.school}
                      className="size-10 md:size-12 p-1 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="size-10 md:size-12 p-1 bg-muted flex items-center justify-center">
                       <Icons.education className="size-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-0.5 ml-1">
                  <div className="font-semibold leading-none flex items-center gap-2 text-base md:text-lg">
                    {education.school}
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                  </div>
                  <div className="font-sans text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    {education.degree}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 text-xs md:text-sm tabular-nums text-muted-foreground text-right flex-none">
                <span className="bg-secondary/50 px-2 py-0.5 rounded-full">
                  {education.start} - {education.end}
                </span>
              </div>
            </Link>
          </motion.div>
        </BlurFade>
      ))}
    </div>
  </div>
</section>

      {/* Skills Section */}
<section id="skills">
  <div className="flex min-h-0 flex-col gap-y-4">
    <BlurFade delay={BLUR_FADE_DELAY * 9}>
      <h2 className="text-xl font-bold">Skills</h2>
    </BlurFade>
    <div className="flex flex-wrap gap-2">
      {DATA.skills.map((skill, id) => (
        <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
          {/* Add motion.div here for the hover effects */}
          <motion.div
            whileHover={{ 
              scale: 1.1, 
              y: -2,
              transition: { type: "spring", stiffness: 400, damping: 10 } 
            }}
            whileTap={{ scale: 0.95 }}
            className="group border bg-background border-border ring-2 ring-border/20 rounded-xl h-9 w-fit px-4 flex items-center gap-2 cursor-default transition-colors hover:border-primary/50 hover:bg-accent"
          >
            {/* Robust Icon Rendering with a subtle rotation on hover */}
            {skill.icon && (
              <skill.icon className="size-4 rounded overflow-hidden object-contain transition-transform duration-300 group-hover:rotate-12" />
            )}
            <span className="text-foreground text-sm font-medium">
              {skill.name}
            </span>
          </motion.div>
        </BlurFade>
      ))}
    </div>
  </div>
</section>
     {/* Projects Section */}
<section id="projects"> {/* This ID matches the /#projects link above */}
  <BlurFade delay={BLUR_FADE_DELAY * 11}>
    <ProjectsSection />
  </BlurFade>
</section>
{/* Research Section */}
<section id="research">
  <div className="space-y-12 w-full py-12">
    <BlurFade delay={BLUR_FADE_DELAY * 11}>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
            Research
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Papers & Publications
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Investigating Explainable AI and its applications in Cybersecurity.
          </p>
        </div>
      </div>
    </BlurFade>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[800px] mx-auto">
      {DATA.research.map((paper, id) => (
        <BlurFade
          key={paper.title}
          delay={BLUR_FADE_DELAY * 12 + id * 0.05}
        >
          <motion.div 
            whileHover={{ y: -4 }}
            className="group flex flex-col h-full overflow-hidden border bg-background hover:bg-accent/5 transition-all duration-300 rounded-xl p-5"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold tracking-tight text-lg leading-tight group-hover:text-primary transition-colors">
                  {paper.title}
                </h3>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                {paper.dates}
              </p>
            </div>
            
            <div className="mt-3 mb-4">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {paper.conference}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
              {paper.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {paper.links?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  // Triggers actual file download if it's a PDF link
                  download={link.type.includes("Download") ? true : undefined}
                  className="flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-[11px] font-medium transition-colors hover:bg-muted"
                >
                  {link.icon}
                  {link.type}
                </a>
              ))}
            </div>
          </motion.div>
        </BlurFade>
      ))}
    </div>
  </div>
</section>
      {/* Empty Hackathons Section - Fixed by removing the BlurFade wrapper */}
      <section id="hackathons"></section>

      {/* Contact Section */}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}