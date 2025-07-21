import { Contact } from "@/types";

const initialContacts: Contact[] = [
 
  {
    id: "1",
    name: "John Wick",
    email: "j.wick@continental.com",
    phone: "+1234567890",
    address: "123 Assassin's Alley, New York City, NY 10001",
    dateOfBirth: "1964-09-02",
  },
  {
    id: "2",
    name: "Sarah Connor",
    email: "s.connor@resistance.net",
    phone: "+1987654321",
    address: "456 Bunker Lane, Hidden Valley, CA 90210",
    dateOfBirth: "1965-02-13",
  },
  {
    id: "3",
    name: "Tony Stark",
    email: "ironman@starkindustries.com",
    phone: "+1112223344",
    address: "10880 Malibu Point, Malibu, CA 90265",
    dateOfBirth: "1970-05-29",
  },
  {
    id: "4",
    name: "Hermione Granger",
    email: "h.granger@hogwarts.ac.uk",
    phone: "+447700900123",
    address: "Gryffindor Tower, Hogwarts Castle, Scotland",
    dateOfBirth: "1979-09-19",
  },
  {
    id: "5",
    name: "Sherlock Holmes",
    email: "s.holmes@221b.co.uk",
    phone: "+442079460000",
    address: "221B Baker Street, London, NW1 6XE",
    dateOfBirth: "1854-01-06",
  },
  {
    id: "6",
    name: "Leia Organa",
    email: "leia.o@rebellion.org",
    phone: "+6543210987",
    address: "Alderaan Palace (Destroyed), Somewhere in Space",
    dateOfBirth: "19BBY-01-01",
  },
  {
    id: "7",
    name: "Walter White",
    email: "heisenberg@methlab.com",
    phone: "+15051234567",
    address: "308 Negra Arroyo Lane, Albuquerque, NM 87104",
    dateOfBirth: "1959-09-07",
  },
  {
    id: "8",
    name: "Elsa of Arendelle",
    email: "elsa@arendelle.gov",
    phone: "+4712345678",
    address: "Ice Palace, North Mountain, Arendelle",
    dateOfBirth: "1821-12-22",
  },
  {
    id: "9",
    name: "Marty McFly",
    email: "m.mcfly@timetravel.com",
    phone: "+18185551985",
    address: "9303 Lyon Estates Drive, Hill Valley, CA 95420",
    dateOfBirth: "1968-06-12",
  },
  {
    id: "10",
    name: "Lara Croft",
    email: "l.croft@tombraider.com",
    phone: "+447911123456",
    address: "Croft Manor, Wimborne, Dorset, UK",
    dateOfBirth: "1968-02-14",
  },
];

const LOCAL_STORAGE_KEY = "contacts_data";

export const getContacts = (): Contact[] => {
  if (typeof window === "undefined") {
    return initialContacts;
  }
  const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedContacts) {
    try {
      return JSON.parse(storedContacts);
    } catch (e) {
      console.error("Error parsing contacts from localStorage:", e);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialContacts));
      return initialContacts;
    }
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialContacts));
  return initialContacts;
};

export const getContactById = (id: string): Contact | undefined => {
  const contacts = getContacts();
  return contacts.find((contact) => contact.id === id);
};

export const updateContact = (updatedContact: Contact): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  const contacts = getContacts();
  const index = contacts.findIndex((c) => c.id === updatedContact.id);

  if (index !== -1) {
    contacts[index] = updatedContact;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    return true;
  }
  return false;
};

export const resetContacts = (): Contact[] => {
  if (typeof window === "undefined") {
    return initialContacts;
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialContacts));
  return initialContacts;
};
