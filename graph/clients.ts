import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export const alchemicaSubgraphClient = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-alchemica",
    cache: new InMemoryCache(),
});
