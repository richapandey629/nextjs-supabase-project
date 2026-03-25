'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Login(){
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        const {error} = await supabase.auth.signInWithPassword ({
            email, password,
        });

        if (error) {
            alert(error.message);
        } else {router.push('/dashboard');}
        };

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className= "bg-white p-8 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4 text-center text-green-950">Login</h1>

        <input
          className="w-full p-2 border mb-3 text-gray-700"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-3 text-gray-700"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-700 text-white p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
    

