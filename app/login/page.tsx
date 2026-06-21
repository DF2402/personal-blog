"use client";

import React from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, formAction, isPending] = React.useActionState(loginAction, { error: "" });

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

          {state.error && (
            <div
              className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600"
            >
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`mt-6 w-full rounded-md px-4 py-2 font-medium text-white transition-colors
              ${isPending ? "cursor-not-allowed bg-gray-400" : "bg-slate-900 hover:bg-slate-800"}`}
          >
            {isPending ? "登入驗證中..." : "登入系統"}
          </button>
        </form>
      </div>
    </div>
  );
}
