"use client";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  shadow?: "convex" | "concave" | "flat";
  className?: string;
  button?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  shadow = "flat",
  className = "",
  onClick,
  button = false,
}: CardProps) {
  const shadowClass =
    shadow === "convex" ? "shadow-convex" : shadow === "concave" ? "shadow-concave" : "";
  const buttonCss = button
    ? `transition-all duration-200 cubic-bezier(0.16, 1, 0.3, 1) 
    hover:scale-[1.015] hover:brightness-105 active:scale-[0.985] 
    active:brightness-95 cursor-pointer select-none`
    : "";
  return (
    <div
      className={`rounded-2xl bg-(--color-bg) p-6 ${shadowClass} ${className} animate-fade-in-up
        ${buttonCss} flex`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
