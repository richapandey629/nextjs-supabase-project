'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Signup successful!');
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className = "bg-white p-8 rounded-lg shadow-md w-80">
      <h1 className="text-3xl font-semibold mb-5 text-center text-blue-950">Sign Up</h1>
      <input
        className="w-full p-2 border rounded mb-3 text-black"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-3 text-black"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleSignup}>Sign Up</button>
    </div>
    </div>
  );
}