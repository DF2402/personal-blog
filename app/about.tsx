"use client";
import Card from "./components/Card";
import { AiFillGithub, AiOutlineFileText, AiOutlineCopy, AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";
import React from "react";
interface AboutProp {
  email: string;
  onNavigate: (tab: "main" | "about" | "techStack") => void;
}

export default function about({ email, onNavigate }: AboutProp) {
  const handleViewPdf = () => {
    window.open(`/api/download_resume`, "_blank");
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const [showToast, setShowToast] = React.useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-(--color-bg) p-10">
      <div className="flex grow flex-col gap-6 p-6">
        <Card shadow="flat">
          <span
            className="font-jetbrains-mono mb-6 text-9xl font-semibold tracking-[0.1em]
              text-slate-500 uppercase"
          >
            graduate-2026
          </span>
        </Card>
        <Link
          href="https://github.com/DF2402"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-inherit no-underline"
        >
          <Card
            shadow="convex"
            className="font-jetbrains-mono h-auto w-full items-center text-9xl leading-none
              font-bold"
            button={true}
          >
            <AiFillGithub />
            Github @ DF2026
          </Card>
        </Link>
        <Card
          shadow="convex"
          className="font-jetbrains-mono h-auto w-full items-center text-9xl leading-none font-bold"
          onClick={handleViewPdf}
          button={true}
        >
          <AiOutlineFileText />
          Resume
        </Card>
        <Card
          shadow="convex"
          className="font-jetbrains-mono h-auto w-full items-center text-9xl leading-none font-bold"
          onClick={handleCopy}
          button={true}
        >
          <AiOutlineCopy />
          {email}
        </Card>
      </div>
      <div className="flex flex-row gap-6 p-6">
        <Card
          shadow="flat"
          className="font-black-ops-one w-full items-center justify-center text-9xl font-bold"
        >
          About
        </Card>
        <Card
          shadow="concave"
          className="font-jetbrains-mono h-auto w-full items-center justify-center text-9xl
            leading-none font-bold"
          onClick={() => onNavigate("main")}
          button={true}
        >
          Danny
        </Card>
      </div>
      {showToast && (
        <div
          className="animate-in fade-in slide-in-from-top-4 pointer-events-none fixed top-10
            left-1/2 z-50 -translate-x-1/2 duration-300"
        >
          <div
            className="font-jetbrains-mono flex items-center gap-2 rounded-full border
              border-neutral-800 bg-neutral-900 px-6 py-3 text-sm text-white shadow-xl"
          >
            <span className="text-green-400">✓</span>
            <span>Copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  );
}
