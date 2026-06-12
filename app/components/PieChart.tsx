"use client";

interface keyValuePair {
  name: string;
  value: number;
}

export default function PieChart({ data }: { data: keyValuePair[] }) {
  const size = 300;
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
  let currentAngle = 0;
  return (
    <>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((item, index) => {
          const sliceAngle = item.value;
          const startAngle = currentAngle;
          const endAngle = currentAngle + sliceAngle;
          currentAngle += sliceAngle;
          const largeArcFlag = sliceAngle > 180 ? 1 : 0;
          const start = polar2Regular(cx, cy, radius, startAngle);
          const end = polar2Regular(cx, cy, radius, endAngle);

          const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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
              style={{ transition: "opacity 0.2s", cursor: "pointer" }}
            >
              <title>{`${item.name}: ${item.value}`}</title>
            </path>
          );
        })}
      </svg>
    </>
  );
}
