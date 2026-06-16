"use client";
import React from "react";
interface keyValuePair {
  name: string;
  value: number;
}

export default function PieChart({ data }: { data: keyValuePair[] }) {
  const [hoveredItem, setHoveredItem] = React.useState<keyValuePair | null>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 10;
  const polar2Regular = (cx: number, cy: number, radius: number, degree: number) => {
    const radian = (degree - 90) * (Math.PI / 180);

    return {
      x: cx + radius * Math.cos(radian),
      y: cy + radius * Math.sin(radian),
    };
  };
  let total = data.reduce((acc, item) => {
    return acc + item.value;
  }, 0);

  data.forEach((item) => {
    item.value = Math.round((item.value / total) * 360);
  });

  const othersValue = data
    .filter((item) => item.value / total < 0.01)
    .reduce((acc, item) => acc + item.value, 0);

  let processedData = data.filter((item) => item.value / total >= 0.01);
  if (othersValue > 0) {
    processedData.push({ name: "Others", value: othersValue });
  }
  let currentAngle = 0;
  processedData.sort((a, b) => b.value - a.value);
  return (
    <div ref={containerRef} className="relative flex flex-row">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        onMouseMove={(e) => {}}
        className="flex-shrink-0"
      >
        {processedData.map((item, index) => {
          const sliceAngle = item.value;
          const startAngle = currentAngle;
          const endAngle = currentAngle + sliceAngle;
          currentAngle += sliceAngle;
          const largeArcFlag = sliceAngle > 180 ? 1 : 0;
          const start = polar2Regular(cx, cy, radius, startAngle);
          const end = polar2Regular(cx, cy, radius, endAngle);
          const midAngle = startAngle + sliceAngle / 2;
          const center = polar2Regular(cx, cy, radius * 0.7, midAngle);
          const colors = ["#0088FE", "#00C49F", "#FFBB28", "#020202"];
          if (sliceAngle === 360) {
            return (
              <circle key={index} cx={cx} cy={cy} r={radius} fill={colors[index % colors.length]} />
            );
          }
          const pathData = [
            `M ${cx} ${cy}`,
            `L ${start.x} ${start.y}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
            `Z`,
          ].join(" ");

          return (
            <path
              key={index}
              d={pathData}
              fill={colors[index % colors.length]}
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
              onMouseEnter={(e) => {
                setHoveredItem(item);
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                  x: center.x,
                  y: center.y,
                });
              }}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <title>{`${item.name}: ${item.value}`}</title>
            </path>
          );
        })}
      </svg>
      <div className="flex flex-col p-10">
        <div
          className="font-jetbrains-mono mb-6 text-4xl font-semibold tracking-[0.1em] text-slate-500
            uppercase"
        >
          {" "}
          Code summary{" "}
        </div>
        {hoveredItem == null ? (
          <div>
            {processedData.map((item, index) => (
              <div
                key={index}
                className="font-jetbrains-mono py-2 text-3xl text-slate-700 transition-colors
                  duration-200"
              >
                {item.name}: {Math.round((item.value / 360) * 100)} %
              </div>
            ))}
          </div>
        ) : (
          <div
            className="font-jetbrains-mono py-2 text-3xl text-slate-700 transition-colors
              duration-200"
          >
            {hoveredItem.name}: {Math.round((hoveredItem.value / 360) * 100)} %
          </div>
        )}
      </div>
    </div>
  );
}
