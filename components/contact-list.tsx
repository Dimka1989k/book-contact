'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getContacts } from '@/lib/data';
import { Contact } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from './ui/input';

export function ContactList() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (id: string) => {
    router.push(`/contacts/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">BOOK CONTACTS</h1>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto block"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  onClick={() => handleRowClick(contact.id)}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  Contact not found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}