'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Contact } from '@/types';
import { updateContact } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner'; 

interface ContactFormProps {
  contact: Contact;
}

export function ContactForm({ contact: initialContact }: ContactFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Contact>(initialContact);
 
  useEffect(() => {
    setFormData(initialContact);
  }, [initialContact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = updateContact(formData);
    if (success) {
      toast.success('The contact has been updated successfully!', {
        description: formData.name,
      });
        } else {
      toast.error('Error saving contact.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" value={formData.address} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="dateOfBirth">Date of Birthday</Label>
        <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
      </div>
      <Button type="submit">Save</Button>
      <Button type="button" variant="outline" className="ml-2" onClick={() => router.back()}>
        Back
      </Button>
    </form>
  );
}