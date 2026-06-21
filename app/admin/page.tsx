"use client";

import React, { useEffect, useState } from "react";
import { getTrafficTrends, getIpSegments } from "../actions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardPage() {
  const [trends, setTrends] = useState<any[]>([]);
  const [ipSegments, setIpSegments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [trendData, ipData] = await Promise.all([getTrafficTrends(), getIpSegments()]);
      setTrends(trendData);
      setIpSegments(ipData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">載入中 / Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-6 text-2xl font-bold">高級數據分析台 / Advanced Analytics Dashboard</h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">
            近 7 天流量與日環比 / Last 7 Days Traffic & DoD Growth
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" textAnchor="end" height={40} />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    value,
                    name === "visits" ? "訪問量 / Visits" : "日環比 / DoD Growth (%)",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#0f172a"
                  strokeWidth={3}
                  name="visits"
                />
                <Line type="monotone" dataKey="increment" stroke="transparent" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">訪客 IP 段畫像 (Top 5) / Top 5 IP Subnets</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ipSegments} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="ip_segment" type="category" width={100} />
                <Tooltip />
                <Bar
                  dataKey="segment_count"
                  fill="#334155"
                  name="訪問次數 / Visit Count"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
