import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import React from "react";

const client = new ApolloClient({
  uri: (() => {
    if (
      document.location.hostname.includes("podcloud.test") ||
      document.location.hostname.includes("lepodcast.test") ||
      document.location.hostname.includes("localhost")
    ) {
      return "https://feeds.podcloud.test/graphql";
    }

    return "https://feeds.podcloud.fr/graphql";
  })(),
  cache: new InMemoryCache(),
});

const PodcloudProvider = ({ guid, children }) => {
  console.log("Rendering provider");
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default PodcloudProvider;
