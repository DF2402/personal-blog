"use client";
import React from "react";
import Main from "./main";
import TechStack from "./techStack";
import About from "./about";
export default function Home() {
  const [tab, setTab] = React.useState<"main" | "about" | "tech stack">("main");
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    async function fetchEmail() {
      try {
        const res = await fetch("/api/email");
        const data = await res.json();
        if (res.ok && data.email) {
          setEmail(data.email);
        }
      } catch (err) {
        console.error("No EMAIL:", err);
      }
    }
    fetchEmail();
  }, []);
  const page = {
    main: <Main onNavigate={setTab} />,
    about: <About email={email} onNavigate={setTab} />,
    "tech stack": <TechStack onNavigate={setTab} />,
  };
  return <> {page[tab]}</>;
}
