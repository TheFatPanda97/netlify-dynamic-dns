import '../scss/global.scss';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    setClient(
      new ApolloClient({
        uri: `${window.location.origin}/api/graphql`,
        cache: new InMemoryCache(),
      }),
    );
  }, []);

  if (!client) {
    return <></>;
  }

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Netlify DDNS</title>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
