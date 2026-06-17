import { useState } from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // fake submit delay (replace with real API later)
    setTimeout(() => {
      setSubmitted(true);

      // auto reset after 3s (optional)
      setTimeout(() => setSubmitted(false), 3000);
    }, 500);
  };

  return (
    <div className="border rounded-xl p-10 relative overflow-hidden">
      {/* Badge */}
      <div className="absolute -top-4 border bg-blue-500 z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-white text-sm font-medium">Contact</span>
      </div>

      {/* Background */}
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

      {/* Content */}
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>

        <p className="mx-auto max-w-lg text-muted-foreground">
          Want to chat about research or opportunities? Send a message or reach
          out directly.
        </p>

        {/* SUCCESS STATE */}
        {submitted ? (
          <div className="mt-10 flex flex-col items-center gap-3 animate-fade-in">
            <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center animate-bounce">
              <span className="text-white text-2xl">✓</span>
            </div>

            <h3 className="text-xl font-semibold text-green-500">
              Message Sent!
            </h3>

            <p className="text-sm text-zinc-400">
              Thanks for reaching out. I’ll get back to you soon.
            </p>
          </div>
        ) : (
          <>
            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl space-y-4 pt-6"
            >
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-3 text-white focus:border-blue-500 outline-none"
              />

              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-3 text-white focus:border-blue-500 outline-none"
              />

              <textarea
                placeholder="Your message"
                rows={5}
                className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-3 text-white focus:border-blue-500 outline-none"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-500 py-4 text-lg font-semibold text-white hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </form>

          
            {/* Direct contact options */}
<div className="pt-6 flex flex-col items-center gap-3">
  <p className="text-sm text-zinc-400">
    You can also directly contact me via WhatsApp or email.
  </p>

  <div className="flex flex-col sm:flex-row gap-4">
    <a
      href="https://wa.me/8801601887741"
      target="_blank"
      className="inline-flex items-center justify-center rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-600 transition-colors"
    >
      WhatsApp
    </a>

    <a
      href="mailto:naimurrohan204@gmail.com"
      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
    >
      Send Email
    </a>
  </div>
</div>
          </>
        )}
      </div>
    </div>
  );
}