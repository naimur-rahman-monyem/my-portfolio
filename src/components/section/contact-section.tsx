"use client";

import { useState } from "react";
import { DATA } from "@/data/resume";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const email = DATA.contact.email;
  const whatsappUrl = DATA.contact.social.WhatsApp.url;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const senderEmail = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    e.currentTarget.reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="border rounded-xl p-10 relative overflow-hidden">
      <div className="absolute -top-4 border bg-blue-500 z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-white text-sm font-medium">Contact</span>
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

        <p className="mx-auto max-w-lg text-muted-foreground">
          Want to chat about research or opportunities? Send a message or reach
          out directly.
        </p>

        {submitted ? (
          <div className="mt-10 flex flex-col items-center gap-3 animate-fade-in">
            <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">Sent</span>
            </div>

            <h3 className="text-xl font-semibold text-green-500">
              Email Draft Opened
            </h3>

            <p className="text-sm text-zinc-400">
              Review the message in your email app and send it from there.
            </p>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl space-y-4 pt-6"
            >
              <input
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-blue-500 outline-none"
              />

              <input
                name="email"
                type="email"
                placeholder="Your email"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-blue-500 outline-none"
              />

              <textarea
                name="message"
                placeholder="Your message"
                rows={5}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-blue-500 outline-none"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-500 py-4 text-lg font-semibold text-white hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </form>

            <div className="pt-6 flex flex-col items-center gap-3">
              <p className="text-sm text-zinc-400">
                You can also directly contact me via WhatsApp or email.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-600 transition-colors"
                >
                  WhatsApp
                </a>

                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
                >
                  Send Email
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
