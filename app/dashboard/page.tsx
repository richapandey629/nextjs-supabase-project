'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*');

    console.log("DATA:", data);
    console.log("ERROR:", error);


    if (error) {
      console.log(error);
    } else {
      setUsers(data);
    }
  };
  
  useEffect(() => {
  checkUser();
}, []);

const checkUser = async () => {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    router.push('/login');
  }
};

return (
    
  <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        

        <thead className="bg-blue-900">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="bg-blue-900">
              <td className="p-3 border">{user.name}</td>
              <td className="p-3 border">{user.email}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  </div>
);
}