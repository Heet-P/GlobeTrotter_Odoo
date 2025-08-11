"use client";

import { useActionState } from "react";
import { createItineraryAction, type FormState } from "./actions";
import Link from "next/link";

function CreateItineraryForm() {
  const initialState: FormState = { message: "" };
  const [state, formAction, pending] = useActionState(
    createItineraryAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="trip_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Itinerary Name
        </label>
        <input
          type="text"
          id="trip_name"
          name="trip_name"
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
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
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="destinations"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Destinations (comma-separated)
        </label>
        <input
          type="text"
          id="destinations"
          name="destinations"
          placeholder="Paris, London, Rome"
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
        />
        {state.errors?.destinations && (
          <p className="mt-2 text-sm text-red-600">
            {state.errors.destinations.join(", ")}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="start_date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Start Date
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
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
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            End Date
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
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
          {pending ? "Creating..." : "Create Itinerary"}
        </button>
      </div>
    </form>
  );
}

export default function CreateItineraryPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Create New Itinerary</h1>
        <p className="text-gray-600 mt-2">Plan your next adventure by creating a detailed travel itinerary.</p>
      </header>
      
      <div className="bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 rounded-lg p-6">
        <CreateItineraryForm />
      </div>
    </div>
  );
}
