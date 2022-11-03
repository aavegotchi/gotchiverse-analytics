import { fakeGotchiSubgraph } from "./helper/subgraphs";

interface ERC1155Balance {
  valueExact: String;
  account: {
    id: String;
  };
}

export async function getFakeGotchis() {
  let query = `
  {accounts(orderBy: amountTokens orderDirection:desc where:{amountTokens_not: null}) {
    id
    amountTokens
  }}
    `;
  let result = await fakeGotchiSubgraph({ query });
  console.log(result);
  return result.data.accounts;
}

export async function getFakeCards() {
  let query = `
  {erc1155Balances(orderBy: valueExact orderDirection: desc first: 100 where:{valueExact_gt: 0 account_not:null}) {
    valueExact
    account {
      id
    }
  }}
    `;
  let result = await fakeGotchiSubgraph({ query });
  return result.data.erc1155Balances.map((e: ERC1155Balance) => ({
    id: e.account.id,
    amountTokens: e.valueExact,
  }));
}
