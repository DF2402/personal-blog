"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`mt-6 w-full rounded-md px-4 py-2 font-medium text-white transition-colors
        ${pending ? "cursor-not-allowed bg-gray-400" : "bg-slate-900 hover:bg-slate-800"}`}
    >
      {pending ? "登入驗證中..." : "登入系統"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, { error: "" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">Admin Portal</h2>

        <form action={formAction}>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">User ID</label>
              <input
                type="text"
                name="userId"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2
                  focus:ring-slate-900 focus:outline-none"
                placeholder="請輸入管理員 ID"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2
                  focus:ring-slate-900 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* 錯誤訊息展示區 */}
          {state.error && (
            <div
              className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600"
            >
              {state.error}
            </div>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
