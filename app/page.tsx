"use client";
import React from "react";
import Main from "./main";
import TechStack from "./techStack";
import About from "./about";
import Mobile from "./moblie";

type LangStats = {
  [key: string]: number;
};

export default function Home() {
  const [tab, setTab] = React.useState<"main" | "about" | "techStack">("main");
  const [email, setEmail] = React.useState("");

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    checkIsMobile();
    console.log({ isMobile });
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  React.useEffect(() => {
    async function fetchEmail() {
      try {
        const res = await fetch("/api/email");
        const data = await res.json();
        if (res.ok && data.email) {
          setEmail(data.email);
          console.log(email);
        }
      } catch (err) {
        console.error("No EMAIL:", err);
      }
    }
    fetchEmail();
  }, []);

  const [langStats, setLangStats] = React.useState<LangStats>({});
  React.useEffect(() => {
    async function handleFetch() {
      const res = await fetch("/api/code_count");
      const data = await res.json();
      if (res.ok && data) {
        console.log(data);
        setLangStats(data);
      }
    }
    handleFetch();
  }, []);

  const page = {
    main: <Main onNavigate={setTab} />,
    about: <About email={email} onNavigate={setTab} />,
    techStack: <TechStack langStats={langStats} onNavigate={setTab} />,
  };

  return (
    <>
      <div className="block md:hidden">
        <Mobile />
      </div>
      <div className="hidden md:block">{page[tab]}</div>;
    </>
  );
}
