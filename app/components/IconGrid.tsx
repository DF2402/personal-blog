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

export default function IconGrid() {
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
    <div className="flex min-w-0 flex-col items-center gap-8 py-10">
      <div className="grid w-full max-w-4xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {tools.map((tool, index) => (
          <Card shadow="concave" key={index} className="w-full">
            <tool.icon size={32} className="text-slate-800" />
            <span className="font-jetbrains-mono text-lg font-bold">{tool.name}</span>
          </Card>
        ))}
      </div>

      <button className="font-black-ops-one rounded-full px-12 py-4 text-2xl">More</button>
    </div>
  );
}
