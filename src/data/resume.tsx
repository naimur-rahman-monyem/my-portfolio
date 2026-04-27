import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { PHP } from "@/components/ui/svgs/php";
import { HTML } from "@/components/ui/svgs/html";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { SQL } from "@/components/ui/svgs/sql";
export const DATA = {
  name: "Naimur Rahman Monyem",
  initials: "DV",
  url: "https://dillion.io",
  location: "Dhaka , Bangladesh",
  locationLink: "https://www.google.com/maps/place/dhaka",
  description:
  "Aspiring Data Analyst | Problem Solver\nI analyze data to uncover stories and drive decisions.\nBuilding skills. Sharing insights.",
  summary:`I am a Computer Science & Engineering student at AIUB with a passion for bridging the gap between complex software development and data-driven insights. 

While my background is rooted in core engineering and development with C# and Java, my true fascination lies in discovering the "why" behind the numbers. I specialize in transforming raw datasets into actionable stories that drive strategic decision-making.

Currently, I am leveraging my technical foundation to master the modern data stack—combining Python, SQL, and analytical thinking to solve real-world problems. I am eager to contribute my technical expertise to a data-forward team where I can grow as a Data Analyst.`,
  avatarUrl: "/naimur.jpg",
  education: [
    {
      school: "American International University-Bangladesh",
      href: "https://www.aiub.edu",
      degree: "Bachelor of Science in Computer Science & Engineering (BSc CSE)",
      logoUrl: "/aiub.png", 
      start: "2022",
      end: "Ongoing",
    },
    {
      school: "Shaheed Ramiz Uddin Cantonment College",
      href: "https://www.sbbrcs.edu.bd/",
      degree: "Higher Secondary Certificate (HSC)",
      logoUrl: "/srcc.jpg", 
      start: "2019",
      end: "2021",
    },
    {
      school: "Safiuddin Sarker Academy and College",
      href: "https://ssaac.edu.bd/",
      degree: "Secondary School Certificate (SSC)",
      logoUrl: "/ssac.png",
      start: "2013",
      end: "2019",
    },
  ],
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Typescript", icon: Typescript},
    { name: "Postgres", icon: Postgresql },
    { name: "Python", icon: Python },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "C#", icon: Csharp },
    { name: "Node.js", icon: Nodejs },
    { name: "Java", icon: Java },
    { name: "SQL", icon: SQL },
    { name: "C++", icon: Csharp },
    { name: "PHP", icon: PHP },
    { name: "HTML", icon: HTML },
  ],
 navbar: [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/#education", icon: Icons.education, label: "Education" },
  { href: "/#projects", icon: Icons.project, label: "Projects" }, 
  { href: "/#research", icon: NotebookIcon, label: "Research Papers" },

  

],
  contact: {
    email: "naimurrohan204@gmail.com",
    tel: "+8801607887741",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/naimurrahman7402",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
  name: "LinkedIn",
  url: "https://www.linkedin.com/in/naimur-rahman-monyem",
  icon: Icons.linkedin,
  navbar: true,
},
    
      WhatsApp: {
      name: "WhatsApp",
      url: "https://wa.me/8801607887741", 
      icon: Icons.whatsapp,
      navbar: true,
    },
      email: {
        name: "Send Email",
        url: "mailto:naimurrohan204@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  
  projects: [
    
    {
  title: "CarSales Inventory Management",
  href: "https://github.com/naimur-rahman-monyem/Carsales-InventoryManagementSystem",
  dates: "January 2024 - Present",
  active: true,
  description:
    "A comprehensive C# desktop application designed to streamline car dealership operations, managing vehicle stock, customer records, and sales transactions efficiently.",
  technologies: [
    "C#",
    ".NET Framework",
    "SQL Server",
    "Entity Framework",  
    "MVC Framework" 
  ],
  links: [
    {
      type: "Source",
      href: "https://github.com/naimur-rahman-monyem/Carsales-InventoryManagementSystem",
      icon: <Icons.github className="size-3" />,
    },
  ],
  image: "/Carsales.png", 
  video: "", 
},
{
  title: "AIUB Cineplex",
  href: "https://github.com/naimur-rahman-monyem/Aiub_Cineplex",
  dates: "2023",
  active: true,
  description:
    "A cinema management system designed to handle movie listings, seat booking, ticket sales, and customer management for AIUB Cineplex. Built to simulate real-world theater operations with a clean user experience.",
  technologies: [
    "Java"
  ],
  links: [
    {
      type: "Source",
      href: "https://github.com/naimur-rahman-monyem/Aiub_Cineplex",
      icon: <Icons.github className="size-3" />,
    },
  ],
  image: "/aiub-cineplex.png",
  video: "",
}, 
{
  title: "Phishing Website Detection using Multi-Modal ML",
  href: "https://github.com/naimur-rahman-monyem/A-Multi-Modal-Machine-Learning-Approach-for-Phishing-Website-Detection-Using-URL-and-Visual-Features",
  dates: "2024- 2025",
  active: true,
  description:
    "Developed a hybrid security framework that combines URL analysis and Computer Vision to detect phishing websites. The system uses a multi-modal machine learning approach to achieve higher accuracy than traditional single-feature methods.",
  technologies: [
    "Python",
    "Machine Learning",
    "NLP",
    "Data Science",
  ],
  links: [
    {
      type: "Source",
      href: "https://github.com/naimur-rahman-monyem/A-Multi-Modal-Machine-Learning-Approach-for-Phishing-Website-Detection-Using-URL-and-Visual-Features",
      icon: <Icons.github className="size-3" />,
    },
  ],
  image: "/phishing-pic.jpg", 
  video: "",
},
{
  title: "Personal Portfolio",
  href: "https://github.com/naimur-rahman-monyem/my-portfolio",
  dates: "2024",
  active: true,
  description:
    "A professional portfolio website built to showcase my projects and thoughts on software development. Features a clean, dark-themed UI with smooth animations and a fully functional blog.",
  technologies: [
    "Next.js",
    "Typescript",
    "Tailwind CSS",
    "Framer Motion",
    "Magic UI",
  ],
  links: [
    {
      type: "Source",
      href: "https://github.com/naimur-rahman-monyem/my-portfolio",
      icon: <Icons.github className="size-3" />,
    },
  ],
  image: "/portfolio-pic.png"
},


],
research: [
  {
    title: "A Multi-Modal Machine Learning Approach for Phishing Website Detection Using URL and Visual Features",
    dates: "Oct 2025 - Jan 2026",
    conference: "Undergraduate Research Project",
    description:
      "A hybrid security framework combining CNN-based visual analysis and DistilBERT for URL features. Achieved high accuracy in identifying malicious websites through multi-modal data fusion.",
    links: [
      {
        type: "Source",
        href: "https://github.com/naimur-rahman-monyem/A-Multi-Modal-Machine-Learning-Approach-for-Phishing-Website-Detection-Using-URL-and-Visual-Features",
        icon: <Icons.github className="size-3" />,
      },
      {
        type: "Download PDF",
       href: "/papers/research_paper_1.pdf", // Ensure this file is in your /public folder
        icon: <Icons.download className="size-3" />,
      },
    ],
  },
  {
    title: "An Explainable Machine Learning Framework for Cybersecurity Risk Prediction",
    dates: "Feb 2026 - Present",
    conference: "Ongoing Research",
    description:
      "Researching clustering-based personalized recommendations and Explainable AI (XAI) to predict and communicate cybersecurity risks effectively to university students.",
    links: [
      {
        type: "Abstract",
        href: "#", 
        icon: <Icons.external className="size-3" />,
      },
    ],
  },
],
  
} as const;
