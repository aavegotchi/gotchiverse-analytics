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

export const gltrStakingSubgraphClient = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-gltr-staking",
    cache: new InMemoryCache(),
});

export const gotchiverseSubgraphClient = new ApolloClient({
    uri: "http://157.90.182.138:8000/subgraphs/id/QmPATkPBEeFtEiaGhTsarrzn8oBAfsgbXVi9uKhUUrTKzC",
    cache: new InMemoryCache(),
});
