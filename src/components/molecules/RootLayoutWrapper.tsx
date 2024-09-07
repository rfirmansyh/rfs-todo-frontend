'use client';

import type { NextFont } from 'next/dist/compiled/@next/font';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from '@/components/atoms/sonner';
import ReactQueryProvider from '@/libs/providers/query.provider';
import { ThemeProvider } from '@/libs/providers/theme.provider';
import { useAppStore } from '@/stores/app/provider.app-store';
import LoaderApp from './Loader/LoaderApp';

const RootLayoutWrapper = ({
  font,
  locale,
  messages,
  children,
}: Readonly<{
  font: NextFont;
  locale: string;
  messages: any;
  children: React.ReactNode;
}>) => {
  const { locale: clientLocale, isLoading } = useAppStore((store) => store);

  return (
    <html lang={clientLocale ?? locale} suppressHydrationWarning>
      <body className={font.className}>
        <ReactQueryProvider>
          <NextIntlClientProvider locale={clientLocale ?? locale} messages={messages} timeZone="Asia/Jakarta">
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
        <LoaderApp isLoading={isLoading} />
        <Toaster closeButton richColors position="top-right" />
      </body>
    </html>
  );
};

export default RootLayoutWrapper;