import { redirect } from 'next/navigation';

// Redirect to the first submenu item (manage)
export default function Page() {
  redirect('/copy-trading/manage');
} 