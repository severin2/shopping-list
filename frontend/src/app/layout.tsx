import '@/app/globals.css';
import { ReduxProviderWrapper } from '@/app/providers/ReduxProviderWrapper';
import { MuiThemeProvider } from '@/app/providers/MuiThemeProvider';
import type { Metadata } from 'next';
import { Dosis, Nunito_Sans } from 'next/font/google';
import Header from '@/components/header';

const dosisSans = Dosis({
  variable: '--font-dosis-sans',
  subsets: ['latin'],
});
const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shopping List',
  description: 'A simple shopping list application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${nunitoSans.variable} ${dosisSans.variable}`}>
        <Header />
        <MuiThemeProvider>
          <ReduxProviderWrapper>{children}</ReduxProviderWrapper>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
