import { ContactContent } from '@/components/contact/ContactContent';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('تماس با ما', '/contact');
export default function ContactPage() {
  return <ContactContent />;
}
