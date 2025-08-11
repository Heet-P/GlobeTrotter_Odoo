export default function Home() {
  return (
    <div className="min-h-[calc(100vh-57px)] mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Plan your next adventure</h1>
      <p className="text-gray-600">Start by creating an account or logging in.</p>
      <div className="space-x-4">
        <a href="/signup" className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-white">Get started</a>
        <a href="/login" className="inline-flex h-10 items-center justify-center rounded-md border px-4">Log in</a>
        <a href="/dashboard" className="inline-flex h-10 items-center justify-center rounded-md border px-4">Dashboard</a>
      </div>
    </div>
  );
}
