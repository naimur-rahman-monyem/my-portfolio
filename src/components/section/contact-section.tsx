import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
       <p className="mx-auto max-w-lg text-muted-foreground text-balance">
  Want to chat about research or potential opportunities? Reach out via:
</p>

<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
  <Link
    href="https://wa.me/8801601887741"
    target="_blank"
    className="inline-flex items-center justify-center rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-600 transition-colors"
  >
    Chat on WhatsApp
  </Link>

  <Link
    href="mailto:naimurrohan204@gmail.com"
    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/90 transition-colors"
  >
    Send Email
  </Link>
</div>
      </div>
    </div>
  );
}