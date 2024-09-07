import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getLocale, getMessages } from 'next-intl/server';
import RootLayoutWrapper from '@/components/molecules/RootLayoutWrapper';
import { AppStoreProvider } from '@/stores/app/provider.app-store';
import '@/styles/app.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nextjs Template',
  description: 'Desceription of Nextjs Template',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <>
      <AppStoreProvider>
        <RootLayoutWrapper font={inter} locale={locale} messages={messages}>
          {children}
        </RootLayoutWrapper>
      </AppStoreProvider>
    </>
  );
}