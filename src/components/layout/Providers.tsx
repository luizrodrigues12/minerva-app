"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const client = new ApolloClient({
    uri: `${process.env.HOST}/api/graphql`,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Providers;
