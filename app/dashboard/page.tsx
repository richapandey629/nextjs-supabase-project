'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUsersAPI, checkUserAPI, addContactAPI, deleteContactAPI, updateContactAPI, logoutAPI } from '@/lib/api';

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editUser, setEditUser] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    checkUserAPI()
      .then(user => setCurrentUser(user))
      .catch(() => router.push('/login'));
    
    fetchUsersAPI()
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, [router]);

  const fetchUsers = async () => {
    try {
      const data = await fetchUsersAPI();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async () => {
    if (!currentUser) return alert("User not logged in");
    try {
      await addContactAPI({ name, email, phone, age: age ? Number(age) : null, user_id: currentUser.id });
      alert("User Added Successfully");
      fetchUsers();
      setName(''); setEmail(''); setPhone(''); setAge('');
    } catch (err: any) { alert(err.message); }
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteContactAPI(id);
      alert("Deleted successfully");
      fetchUsers();
    } catch (err: any) { alert(err.message); }
  };

  const handleEdit = (user: any) => {
    if (!user) return;
    setEditUser(user);
    setName(user.name || ''); setEmail(user.email || ''); setPhone(user.phone || ''); setAge(user.age || '');
  };

  const handleUpdate = async () => {
    if (!editUser) return;
    try {
      await updateContactAPI(editUser.id, { name, email, phone, age: age ? Number(age) : null });
      alert("Updated successfully");
      setEditUser(null);
      fetchUsers();
    } catch (err: any) { alert(err.message); }
  };

  const handleLogout = async () => {
    await logoutAPI();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl text-gray-900 text-center font-bold mb-6">Dashboard</h1>
      <div className="bg-blue-900 shadow rounded-lg overflow-hidden">
        <div className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2 text-2xl text-blue-900 text-center">Add User</h2>
          <input className="border p-4 mb-2 text-blue-900" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
          <input className="border p-4 mb-2 text-blue-900 block" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className="border p-4 mb-2 text-blue-900 block" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          <input className="border p-4 mb-2 text-blue-900" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}/>
          <button className="bg-blue-800 text-white px-4 py-2 rounded-2xl block" onClick={editUser ? handleUpdate : handleAddUser}>
            {editUser ? "Update" : "Save"}
          </button>
        </div>
        <table className="w-full text-left border-collapse overflow-auto">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id || index} className="hover:bg-blue-600">
                <td className="p-3 border hover:bg-blue-600">{user.name}</td>
                <td className="p-3 border hover:bg-blue-600">{user.email}</td>
                <td className="p-3 border hover:bg-blue-600">{user.phone}</td>
                <td className="p-3 border hover:bg-blue-600">{user.age}</td>
                <td className="p-3 border">
                  <button className="bg-gray-500 text-white px-3 py-1 rounded-3xl" onClick={() => handleDelete(user.id)}>Delete</button>
                  <button className="bg-gray-500 text-white px-3.5 py-1 ml-2 rounded-3xl" onClick={() => handleEdit(user)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mb-4 bg-red-700 text-white px-4 py-2 rounded mt-4" onClick={handleLogout}>Logout</button>
    </div>
  );
}

   