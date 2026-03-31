import { supabase } from '@/lib/supabaseClient';

export const fetchUsersAPI = async () => {
  const { data, error } = await supabase.from('contacts').select('*');
  if (error) throw error;
  return data;
};

export const checkUserAPI = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw error || new Error("No user");
  return data.user;
};

export const addContactAPI = async (contact: any) => {
  const { error } = await supabase.from('contacts').insert([contact]);
  if (error) throw error;
};

export const deleteContactAPI = async (id: string) => {
  const { error } = await supabase.from('contacts').delete().eq('id', id);
  if (error) throw error;
};

export const updateContactAPI = async (id: string, contact: any) => {
  const { error } = await supabase.from('contacts').update(contact).eq('id', id);
  if (error) throw error;
};

export const logoutAPI = async () => {
  await supabase.auth.signOut();
};