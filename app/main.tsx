"use client";
import Card from "./components/Card";
import Frame from "./components/Frame";
import React from "react";
interface MainProps {
  onNavigate: (tab: "main" | "about" | "techStack") => void;
}
export default function Main({ onNavigate }: MainProps): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col gap-10 bg-(--color-bg) p-10">
      <div className="flex flex-1 flex-row items-center gap-6">
        <Card shadow="flat" className="font-black-ops-one w-fit items-center text-9xl font-bold">
          My Name
        </Card>
        <div className="">
          <Card
            shadow="convex"
            className="font-jetbrains-mono h-auto w-full items-center text-9xl leading-none
              font-bold"
          >
            Danny
          </Card>
        </div>
      </div>
      <div className="flex">
        <Frame />
      </div>
      <div className="flex flex-1 flex-row gap-6">
        <Card
          shadow="concave"
          className="font-black-ops-one w-full items-center justify-center text-9xl font-bold"
          onClick={() => onNavigate("about")}
          button={true}
        >
          About
        </Card>
        <Card
          shadow="concave"
          className="font-black-ops-one w-full items-center justify-center text-9xl font-bold"
          onClick={() => onNavigate("techStack")}
          button={true}
        >
          Tech Stack
        </Card>
      </div>
    </div>
  );
}
