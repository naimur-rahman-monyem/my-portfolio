"use client";

import { useState } from "react";
import { DATA } from "@/data/resume";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const email = DATA.contact.email;
  const whatsappUrl = DATA.contact.social.WhatsApp.url;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const senderEmail = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: senderEmail,
          message,
        }),
      });

      const data: { success?: boolean; error?: string } = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setErrorMessage("");
        e.currentTarget.reset();
        setTimeout(() => setStatus("idle"), 3000);
        return;
      }

      setErrorMessage(data.error || "Something went wrong. Please try again.");
      setStatus("error");
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
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

        {status === "success" ? (
          <div className="mt-10 flex flex-col items-center gap-3 animate-fade-in">
            <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">Sent</span>
            </div>

            <h3 className="text-xl font-semibold text-green-500">
              Message Sent
            </h3>

            <p className="text-sm text-zinc-400">
              Thanks for reaching out. I&apos;ll get back to you soon.
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
                disabled={status === "loading"}
                className="w-full rounded-xl bg-blue-500 py-4 text-lg font-semibold text-white hover:bg-blue-600 transition-colors"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
              )}
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
