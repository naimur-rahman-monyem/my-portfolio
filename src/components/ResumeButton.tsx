"use client";

import { Download } from "lucide-react";

export default function ResumeButton() {
  return (
    <a
      href="/Naimur_Rahman_CV.pdf"
      download
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-black px-4 py-3 text-white shadow-lg hover:scale-105 transition"
    >
      <Download size={18} />
       Resume
    </a>
  );
}