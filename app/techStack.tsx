"use client";
import Card from "./components/Card";
import CardList from "./components/CardList";
interface TechStackProps {
  onNavigate: (tab: "main" | "about" | "tech stack") => void;
}
type TechStackEntry = [string, string[]];
export default function TechStack({ onNavigate }: TechStackProps) {
  const skillData = JSON.stringify({
    frontend: ["React", "Tailwind CSS"],
    backend: ["Node.js", "Next.js", "Django"],
    language: ["Python", "JavaScript", "TypeScript"],
    other: ["Figma", "SQL"],
  });
  const parsedTechStackList: TechStackEntry[] = Object.entries(JSON.parse(skillData)).map(
    ([key, value]) => [key, value as string[]],
  );
  return (
    <div className="flex min-h-screen flex-col bg-(--color-bg) p-10">
      <div className="grow gap-6 p-6">
        <CardList list={parsedTechStackList} />
      </div>

      <div className="flex flex-row gap-6 p-6">
        <Card
          shadow="concave"
          className="font-jetbrains-mono h-auto w-full items-center justify-center text-9xl
            leading-none font-bold"
          onClick={() => onNavigate("main")}
          button={true}
        >
          Danny
        </Card>
        <Card
          shadow="flat"
          className="font-black-ops-one w-full items-center justify-center text-9xl font-bold"
        >
          Tech Stack
        </Card>
      </div>
    </div>
  );
}
