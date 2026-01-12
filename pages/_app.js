import '@/styles/globals.css';
import Head from 'next/head';
import { SettingsProvider } from '@/lib/settingsContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Finote Loza School</title>
        <meta name="description" content="Finote Loza School - Excellence in Education" />
        <meta property="og:title" content="Finote Loza School" />
        <meta property="og:description" content="Excellence in Education" />
        <meta property="og:type" content="website" />
      </Head>
      <SettingsProvider>
        <Component {...pageProps} />
      </SettingsProvider>
    </>
  );
}



