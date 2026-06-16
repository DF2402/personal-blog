"use client";
import React from "react";
import Card from "./Card";

interface FrameProps {
  textList?: string[];
}

export default function Frame({ textList }: FrameProps) {
  const [testList] = React.useState<string[]>(
    textList || ["Full Stack Developer", "Programmer", "Fresh graduate"],
  );
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<"typing" | "idle" | "deleting">("typing");
  const [cursorIndex, setCursorIndex] = React.useState<number>(0);
  const [displayText, setDisplayText] = React.useState<string>("");
  React.useEffect(() => {
    setDisplayText(testList[currentTextIndex].slice(0, cursorIndex));

    if (phase === "deleting") {
      if (cursorIndex > 0) {
        setTimeout(() => setCursorIndex((prev) => prev - 1), 300);
      } else {
        setPhase("typing");
        setCurrentTextIndex((prev) => (prev + 1) % testList.length);
      }
    } else {
      if (cursorIndex < testList[currentTextIndex].length) {
        setTimeout(() => setCursorIndex((prev) => prev + 1), 200);
      } else {
        setPhase("idle");
        setTimeout(() => setPhase("deleting"), 3000);
      }
    }
  }, [phase, currentTextIndex, testList, cursorIndex]);

  return (
    <>
      <Card shadow="concave" className="h-full w-full text-5xl font-bold">
        <Card shadow="convex" className="font-geist-mono h-full w-full text-5xl font-bold">
          <span className="truncate text-sm md:text-2xl lg:text-4xl"> {displayText}</span>
          <span
            className={`${phase === "idle" || phase === "deleting" ? "animate-blink" : ""}
              inline-block truncate text-sm md:text-2xl lg:text-4xl`}
          >
            _
          </span>
        </Card>
      </Card>
    </>
  );
}
