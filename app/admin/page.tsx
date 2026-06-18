import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

// 這是一個 Server Component
export default async function AdminDashboard() {
  // 1. 讀取並解密當前使用者的資訊
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  // 雖然 Middleware 已經擋過一次了，但為求嚴謹，我們還是解出 payload 來顯示畫面
  const payload = token ? await decrypt(token) : null;
  const currentUserId = payload?.userId || "未知用戶";

  return (
    <div className="p-8">
      <div
        className="mb-6 flex items-center justify-between rounded-lg border bg-white p-6 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800"> (Dashboard)</h1>
          <p className="mt-1 text-gray-500">
            User ID: <span className="font-semibold text-slate-900">{currentUserId}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div
          className="flex h-32 items-center justify-center rounded-lg border bg-white p-6
            text-gray-400 shadow-sm"
        ></div>
        <div
          className="flex h-32 items-center justify-center rounded-lg border bg-white p-6
            text-gray-400 shadow-sm"
        ></div>
      </div>
    </div>
  );
}
