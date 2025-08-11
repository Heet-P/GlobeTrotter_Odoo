import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOutAction } from "../(auth)/actions";
import Link from "next/link";

// Define the itinerary type
type Itinerary = {
  id: string;
  created_at: string;
  trip_name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  destinations: string[] | null;
  user_id: string;
};

export const dynamic = "force-dynamic"; // ensure auth check on each request

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch user's itineraries
  const { data: itineraries, error } = await supabase
    .from("itineraries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching itineraries:", error);
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Welcome, {user.email?.split("@")[0] || "Trotter"}!
        </h1>
        <form action={signOutAction}>
          <button
            type="submit"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md"
          >
            Sign Out
          </button>
        </form>
      </header>

      <main>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Itineraries</h2>
          <Link
            href="/trips/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            + Create New Itinerary
          </Link>
        </div>

        {itineraries && itineraries.length > 0 ? (
          <div className="grid gap-4">
            {itineraries.map((itinerary: Itinerary) => (
              <div key={itinerary.id} className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">{itinerary.trip_name}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(itinerary.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                {itinerary.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{itinerary.description}</p>
                )}
                
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>
                    <strong>Start:</strong> {new Date(itinerary.start_date).toLocaleDateString()}
                  </span>
                  <span>
                    <strong>End:</strong> {new Date(itinerary.end_date).toLocaleDateString()}
                  </span>
                </div>
                
                {itinerary.destinations && itinerary.destinations.length > 0 && (
                  <div className="text-sm">
                    <strong>Destinations:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {itinerary.destinations.map((dest: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                        >
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">
              You have no itineraries yet. Start planning your next adventure!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
