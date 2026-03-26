'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [ email, setEmail ] = useState('');
  const [ name , setName ] = useState('');
  const [ phone , setPhone ] = useState('');
  const [ age , setAge ] = useState('');

  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  useEffect(() => {
    checkUser();
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

const handleAddUser = async () => {
  const { data : userData } = await supabase.auth.getUser();

  if (!userData.user){
    alert("User not logged in")
    return;
  }
  const { error } = await supabase.from('contacts').insert([
    { name, email, phone, age,
      user_id : userData.user.id
     }
  ]);

  if (error) {
    alert(error.message);
  } else {
    alert("User Added Successfully");
    fetchUsers();
    setName('');
    setEmail('');
    setPhone('');
    setAge('');
  }
}

return (
    
  <div className="min-h-screen bg-gray-100 p-6">
  <div className="min-h-screen bg-gray-100 p-6">

    <h1 className="text-3xl text-gray-900 text-center font-bold mb-6">Dashboard</h1>

    <div className="bg-blue-900 shadow rounded-lg overflow-hidden">
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className = "text-lg font-bold mb-2 text-2xl text-blue-900 text-center">Add User</h2>

        <input
          className="border p-4 mb-2 text-blue-900"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}/>

          <input
          className="border p-4 mb-2 text-blue-900 block"
          placeholder = "Email"
          onChange= {(e) => setEmail(e.target.value)}/>

          <input
          className= "border p-4 mb-2 text-blue-900 block"
          placeholder = "Phone"
          onChange= {(e) => setPhone(e.target.value)}/>

          <input
          className = "border p-4 mb-2 text-blue-900"
          placeholder = "Age"
          onChange= {(e) => setAge(e.target.value)}/>

          <button
            className = "bg-blue-800 text-white px-4 py-2 rounded-2xl block"
            onClick={handleAddUser}> Save </button>

          </div>
      <table className="w-full text-left border-collapse overflow-auto">

        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Age</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-blue-600">
              <td className="p-3 border hover:bg-blue-600">{user.name}</td>
              <td className="p-3 border hover:bg-blue-600">{user.email}</td>
              <td className= "p-3 border hover:bg-blue-600">{user.phone}</td>
              <td className="p-3 border hover:bg-blue-600">{user.age}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  </div>
  <button
      className="mb-4 bg-red-700 text-white px-4 py-2 rounded "
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
);
}

   