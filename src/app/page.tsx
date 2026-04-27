/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlurFade from "@/components/magicui/blur-fade"; 
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Markdown from "react-markdown";
import { ProjectCard } from "@/components/project-card";

const BLUR_FADE_DELAY = 0.04;

function CyclingDescription({ description }: { description: string }) {
  const lines = description.split("\n");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length); 
    }, 3000);
    return () => clearInterval(timer);
  }, [lines.length]);

  return (
    <div className="h-12 md:h-16 flex items-center">
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

// --- Main Page Component ---

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative px-6 py-12 md:py-24">
      
      {/* Hero Section */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="gap-2 flex flex-col order-2 md:order-1 flex-1">
              <BlurFade delay={BLUR_FADE_DELAY} yOffset={8}>
                <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                  Hi, I'm {DATA.name.split(" ")[0]} 
                </h1>
              </BlurFade>
              <CyclingDescription description={DATA.description} />
            </div>

            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </motion.div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Education Section */}
      <section id="education">
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education?.map((edu, index) => (
              <BlurFade key={edu.school} delay={BLUR_FADE_DELAY * 8 + index * 0.1} yOffset={10}>
                <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Link href={edu.href} target="_blank" className="flex items-center gap-x-3 justify-between group">
                    <div className="flex items-center gap-x-3 flex-1 min-w-0">
                      <div className="relative flex-none overflow-hidden rounded-full ring-2 ring-border transition-all duration-300 group-hover:ring-primary/50 group-hover:shadow-md">
                        {edu.logoUrl ? (
                          <img src={edu.logoUrl} alt={edu.school} className="size-10 md:size-12 p-1 object-contain transition-transform duration-300 group-hover:scale-110" />
                        ) : (
                          <div className="size-10 md:size-12 p-1 bg-muted flex items-center justify-center">
                            <Icons.education className="size-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5 ml-1">
                        <div className="font-semibold leading-none flex items-center gap-2 text-base md:text-lg">
                          {edu.school}
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        </div>
                        <div className="text-sm md:text-base text-muted-foreground">{edu.degree}</div>
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground tabular-nums">
                      <span className="bg-secondary/50 px-2 py-0.5 rounded-full">{edu.start} - {edu.end}</span>
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
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group border bg-background border-border ring-2 ring-border/20 rounded-xl h-9 px-4 flex items-center gap-2 cursor-default transition-colors hover:border-primary/50 hover:bg-accent"
                >
                  {skill.icon && <skill.icon className="size-4 transition-transform group-hover:rotate-12" />}
                  <span className="text-foreground text-sm font-medium">{skill.name}</span>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
{/* Projects Section */}
<section id="projects">
  <div className="space-y-12 w-full py-12">
    <BlurFade delay={BLUR_FADE_DELAY * 11}>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
            My Projects
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Check out my latest work
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I&apos;ve worked on everything from simple websites to complex 
            machine learning models for cybersecurity.
          </p>
        </div>
      </div>
    </BlurFade>
    
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
      {DATA.projects.map((project, id) => (
        <BlurFade
          key={project.title}
          delay={BLUR_FADE_DELAY * 12 + id * 0.05}
        >
          <ProjectCard
            href={project.href}
            key={project.title}
            title={project.title}
            description={project.description}
            dates={project.dates}
            tags={project.technologies}
            image={project.image}
            // This ternary prevents the 'unknown' and 'missing property' errors
            video={"video" in project ? (project.video as string) : undefined}
            links={project.links}
          />
        </BlurFade>
      ))}
    </div>
  </div>
</section>
      {/* Research Section */}
      <section id="research">
        <div className="mx-auto w-full max-w-2xl space-y-12 py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">Research</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Papers & Publications</h2>
              <p className="text-muted-foreground md:text-xl">Investigating Explainable AI and its applications in Cybersecurity.</p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DATA.research.map((paper, id) => (
              <BlurFade key={paper.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
                <motion.div whileHover={{ y: -4 }} className="group flex flex-col h-full border bg-background hover:bg-accent/5 transition-all rounded-xl p-5">
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{paper.title}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-1">{paper.dates}</p>
                  <div className="mt-3 mb-4">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{paper.conference}</span>
                  </div>
                  <p className="text-sm text-muted-foreground flex-grow">{paper.description}</p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {paper.links?.map((link, idx) => (
                      <a key={idx} href={link.href} target="_blank" rel="noreferrer" download={link.type.includes("Download")} className="flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-[11px] font-medium transition-colors hover:bg-muted">
                        {link.icon} {link.type}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="mx-auto w-full max-w-2xl text-center py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-4">
              Want to chat about phishing detection or research? My inbox is always open.
            </p>
            <Link href={`mailto:${DATA.contact.email}`} className="inline-block mt-8 text-primary hover:underline font-medium">
              {DATA.contact.email}
            </Link>
          </BlurFade>
        </div>
      </section>

    </main>
  );
}