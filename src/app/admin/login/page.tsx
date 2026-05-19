import type { Metadata } from 'next';
import AdminLoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Team Login | Junegiri Yatra',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
