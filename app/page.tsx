import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      <h1 className="text-3xl font-bold text-blue-950">Welcome to App</h1>

      <Link href="/signup">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Account
        </button>
      </Link>

      <p className=" text-xs text-gray-800">Already an existing user?</p>
      <Link href="/login">
        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Login
        </button>
      </Link>
    </div>
  );
}