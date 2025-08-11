import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOutAction } from "../(auth)/actions";

export const dynamic = "force-dynamic"; // ensure auth check on each request

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p>You are signed in as {data.user.email}</p>
        <form action={signOutAction}>
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-white hover:opacity-90">Sign out</button>
        </form>
      </div>
    </div>
  );
}
