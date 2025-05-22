import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed from Geist
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/components/layout/app-layout';

const inter = Inter({ // Changed from geistSans/geistMono
  variable: '--font-sans', // Changed from --font-geist-sans
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SprayerDrones Manager',
  description: 'Manage your drone spraying operations efficiently.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}> {/* Changed class */}
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
