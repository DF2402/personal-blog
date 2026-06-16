"use client";
import Card from "./Card";
import {
  SiPython,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiDjango,
} from "react-icons/si";

export default function TechStack({ langStats, onNavigate }: TechStackProps) {
  const tools = [
    { icon: SiPython, name: "Python" },
    { icon: SiReact, name: "React" },
    { icon: SiNodedotjs, name: "Node.js" },
    { icon: SiTypescript, name: "Typescript" },
    { icon: SiNextdotjs, name: "Next.js" },
    { icon: SiJavascript, name: "Javascript" },
    { icon: SiTailwindcss, name: "Tailwind" },
    { icon: SiDjango, name: "Django" },
  ];

  return (
    <div className="flex flex-col items-center gap-8 p-10">
      <div className="grid w-full max-w-4xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl bg-gray-200 p-4
              shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]"
          >
            <tool.icon size={32} className="text-slate-800" />
            <span className="font-jetbrains-mono text-lg font-bold">{tool.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onNavigate("main")}
        className="font-black-ops-one rounded-full px-12 py-4 text-2xl"
      >
        More
      </button>
    </div>
  );
}
