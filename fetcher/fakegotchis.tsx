import { fakeGotchiSubgraph } from "./helper/subgraphs";

export async function getFakeGotchis() {
    let query = `
    {accounts(orderBy: ownerOfAmount orderDirection:desc) {
        id
        ownerOfAmount
      }}
    `;
    let result = await fakeGotchiSubgraph({ query });
    return result.data.accounts;
}
