"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";

export default function WorkSection() {
  return (
    <div className="mx-auto w-full max-w-2xl flex flex-col gap-y-6">
      
      {DATA.work?.map((work, index) => (
        <BlurFade
          key={work.company}
          delay={0.04 * 8 + index * 0.1}
          yOffset={10}
        >
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-x-3 justify-between group">
              
              {/* LEFT SIDE */}
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                
                {/* LOGO */}
                <div className="relative flex-none overflow-hidden rounded-full ring-2 ring-border transition-all duration-300 group-hover:ring-primary/50 group-hover:shadow-md">
                  {work.logoUrl ? (
                    <img
                      src={work.logoUrl}
                      alt={work.company}
                      className="size-10 md:size-12 p-1 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="size-10 md:size-12 p-1 bg-muted flex items-center justify-center">
                      <Icons.work className="size-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* TEXT */}
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 ml-1">
                  
                  <Link
  href={work.href}
  target="_blank"
  rel="noopener noreferrer"
  className="font-semibold leading-none flex items-center gap-2 text-base md:text-lg hover:text-primary"
>
  {work.company}
  <ArrowUpRight className="h-3.5 w-3.5" />
</Link>

                  <div className="text-sm md:text-base text-muted-foreground">
                    {work.title}
                  </div>

                  <div className="text-xs md:text-sm text-muted-foreground">
                    {work.description}
                  </div>

                </div>
              </div>

              {/* RIGHT SIDE (DATES) */}
              <div className="text-xs md:text-sm text-muted-foreground tabular-nums">
                <span className="bg-secondary/50 px-2 py-0.5 rounded-full">
                  {work.start} - {work.end}
                </span>
              </div>

            </div>
          </motion.div>
        </BlurFade>
      ))}
    </div>
  );
}
