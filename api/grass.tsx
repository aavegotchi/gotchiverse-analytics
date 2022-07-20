import { gotchiverseSubgraph } from "./helper/subgraphs";


export async function getGrass() {
    let query = `
        {tileTypes(where: {name_contains: "Grass"}) {
            name
            amount
        }}
    `;
    let result = await gotchiverseSubgraph({ query });
    return result.data.tileTypes;
}
