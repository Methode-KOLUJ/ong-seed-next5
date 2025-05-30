import {SEO} from '@/components/SEO';
import { Metadata } from 'next';
import Chatbot from '@/components/conversations/Chatbot';

export const metadata: Metadata = SEO({
  title: 'SEED Chatbot',
  description: 'Discutez avec notre chatbot pour en savoir plus sur l\'ONG SEED et ses actions.',
});

export default function ConversationsPage() {
  return <Chatbot />;
}
