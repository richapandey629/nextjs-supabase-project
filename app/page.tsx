'use client'; // 1. Essential for interactive buttons

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Ensure path is correct
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  // 2. State to store user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 3. Logic for Login
  const handleAuth = async (type: 'login' | 'signup') => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    setLoading(true);
    const { data, error } = type === 'login' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      // --- MODIFIED PART START ---
      const successMsg = type === 'login' ? "Welcome back!" : "Account created successfully!";
      alert(successMsg);

      // We check if data.user exists (meaning signup/login worked) 
      // then we push to dashboard for BOTH cases
      if (data.user) {
        router.push('/dashboard');
      }
      // --- MODIFIED PART END ---
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Welcome To App</h1>

      <Card className="w-full max-w-sm shadow-xl border-t-4 border-blue-900">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button 
            className="w-full bg-green-700 hover:bg-green-900 hover:text-white cursor-pointer" 
            disabled={loading}
            onClick={() => handleAuth('login')}
          >
            {loading ? "Processing..." : "Login"}
          </Button>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">Or</span></div>
          </div>
          <Button 
            variant="outline" className="w-full text-white bg-blue-600 hover:bg-blue-900 hover:text-white cursor-pointer" 
            onClick={() => handleAuth('signup')}
          >
            Create New Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}