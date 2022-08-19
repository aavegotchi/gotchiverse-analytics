import { gotchiverseSubgraph } from "./helper/subgraphs";
export async function getRugs() {
    let query = `
        {tileTypes(where: {name_contains: "Rug"}) {
            name
            amount
        }}
    `;
    let result = await gotchiverseSubgraph({ query });
    return result.data.tileTypes;
}
