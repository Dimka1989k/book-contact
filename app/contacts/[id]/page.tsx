import { notFound } from "next/navigation";
import { getContactById } from "@/lib/data";
import { ContactForm } from "@/components/contact-form";

interface ContactDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ContactDetailPage({
  params,
}: ContactDetailPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;

  const contact = await getContactById(id);

  if (!contact) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Detailed contact</h1>
      <ContactForm contact={contact} />
    </div>
  );
}
