"use client";
import Card from "./Card";

interface CardListProps {
  list: [string, string[]][];
}

export default function CardList({ list }: CardListProps) {
  return (
    <div className="flex w-auto gap-6">
      {list.map((item, index) => (
        <Card key={index} shadow="concave" className="flex flex-1 flex-col items-start gap-6">
          <h2
            className="font-jetbrains-mono mb-6 text-4xl font-semibold tracking-[0.1em]
              text-slate-500 uppercase"
          >
            {item[0]}
          </h2>
          <ul className="list-disc pl-5">
            {item[1].map((subItem, subindex) => (
              <li
                key={subindex}
                className="font-jetbrains-mono py-2 text-3xl text-slate-700 transition-colors
                  duration-200"
              >
                {subItem}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
