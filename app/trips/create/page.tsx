"use client";

import { useActionState } from "react";
import { createTripAction, type FormState } from "./actions";
import Link from "next/link";

export default function CreateTripForm() {
  const initialState: FormState = { message: "" };
  const [state, formAction, pending] = useActionState(
    createTripAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="trip_name"
          className="block text-sm font-medium text-gray-700"
        >
          Trip Name
        </label>
        <input
          type="text"
          id="trip_name"
          name="trip_name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
        {state.errors?.trip_name && (
          <p className="mt-2 text-sm text-red-600">
            {state.errors.trip_name.join(", ")}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="start_date"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          {state.errors?.start_date && (
            <p className="mt-2 text-sm text-red-600">
              {state.errors.start_date.join(", ")}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="end_date"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          {state.errors?.end_date && (
            <p className="mt-2 text-sm text-red-600">
              {state.errors.end_date.join(", ")}
            </p>
          )}
        </div>
      </div>

      {state.message && !state.errors && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {pending ? "Creating..." : "Create Trip"}
        </button>
      </div>
    </form>
  );
}
