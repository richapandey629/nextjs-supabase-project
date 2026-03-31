'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUsersAPI, checkUserAPI, addContactAPI, deleteContactAPI, updateContactAPI, logoutAPI } from '@/lib/api';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
 
export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editUser, setEditUser] = useState<any>(null);

  const [isDialogOpen , setIsDialogOpen] = useState(false);

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
       <nav className = "flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-300">
          <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
            {currentUser?.email?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium ">Logged In As</p>
          <p className="text-sm font-bold text-slate-900">{currentUser?.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-xs text-slate-600 font-medium"> Online</span>
      </div>
      </nav>
      <div className="bg-blue-900 shadow rounded-lg overflow-hidden">
        <div className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2 text-2xl text-blue-900 text-center">Add User</h2>
         
          <input className="border p-4 mb-2 text-blue-900" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
          <input className="border p-4 mb-2 text-blue-900 block" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className="border p-4 mb-2 text-blue-900 block" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          <input className="border p-4 mb-2 text-blue-900" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}/>
          <Button variant = "outline" size="lg" className="bg-blue-800 text-white block hover:bg-blue-600 hover:text-white cursor-pointer pr-4 pl-4 text-center bg-center " onClick={editUser ? handleUpdate : handleAddUser}>
            {editUser ? "Update" : "Save"}
          </Button>
        </div>
        <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Age</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" className="text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white" onClick={() => handleEdit(user)}>Edit</Button>
                  <Button variant="outline" size="sm" className="text-red-500 cursor-pointer hover:text-white hover:bg-red-600" onClick={() => handleDelete(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </div>
      <div className = " mt-8 border-t pt-6">
      <Button variant="destructive" size="lg" className="w-full sm:w-auto px-8 text-lg text-red-900 " onClick={handleLogout}>Logout</Button>
      </div>
      </div>
  );
}

   