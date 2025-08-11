import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOutAction } from "../(auth)/actions";
import Link from "next/link";

export const dynamic = "force-dynamic"; // ensure auth check on each request

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
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
          <h2 className="text-xl font-semibold">My Trips</h2>
          <Link
            href="/trips/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            + Create New Trip
          </Link>
        </div>

        <div className="p-8 text-center border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            You have no trips yet. Start planning your next adventure!
          </p>
        </div>
      </main>
    </div>
  );
}
