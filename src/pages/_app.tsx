import '../scss/global.scss';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

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
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
