import { TermsContent } from '@/components/shared/TermsContent';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('قوانین و حریم خصوصی', '/terms');
export default function TermsPage() {
  return <TermsContent />;
}
