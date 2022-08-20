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
    uri: "https://api.thegraph.com/subgraphs/id/QmRZvLBaWK1EX339TsxFPmhUuskNA3YAghonwR8grWZVXx",
    cache: new InMemoryCache(),
});
