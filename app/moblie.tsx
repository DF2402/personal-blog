import React from "react";
import Frame from "./components/Frame";
import Card from "./components/Card";
import { AiFillGithub, AiOutlineFileText } from "react-icons/ai";
import Link from "next/link";
import IconGrid from "./components/IconGrid";
export default function Mobile(): React.JSX.Element {
  const handleViewPdf = () => {
    window.open(`/api/download_resume`, "_blank");
  };
  return (
    <div className="flex min-h-screen flex-col gap-6 bg-(--color-bg) p-4">
      <div>
        <Frame />
      </div>
      <div className="items-center justify-center">
        <Card
          shadow="concave"
          className="font-jetbrains-mono text-blod items-center justify-center text-5xl"
        >
          {" "}
          Danny
        </Card>
      </div>
      <div>
        <Card shadow="concave" className="flex flex-col">
          <Link
            href="https://github.com/DF2402"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-6 text-inherit no-underline"
          >
            <Card
              shadow="convex"
              className="font-jetbrains-mono h-auto w-full items-center text-xl leading-none
                font-bold"
              button={true}
            >
              <AiFillGithub />
              Github @ DF2026
            </Card>
          </Link>
          <div className="p-6">
            <Card
              shadow="convex"
              className="font-jetbrains-mono h-auto w-full items-center text-xl leading-none
                font-bold"
              onClick={handleViewPdf}
              button={true}
            >
              <AiOutlineFileText />
              Resume
            </Card>
          </div>
        </Card>

        <div>
          <IconGrid />
        </div>
      </div>
    </div>
  );
}
