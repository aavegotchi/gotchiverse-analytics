import { INTERVAL_ALL, INTERVAL_DAY } from "./helper/constats";
import { getCurrentBlock } from "./helper/eth";
import { coreMaticSubgraph } from "./helper/subgraphs";

export const getGotchis = async (interval = INTERVAL_ALL) => {
    let query = `{statistic(id: "0") {
      aavegotchisClaimed 
      aavegotchisSacrificed
      aavegotchisBorrowed
    }}`;

    let result = await coreMaticSubgraph({ query });
    let data = result.data.statistic;

    return data;
};

export const getGotchisDiff = async (
    interval = INTERVAL_ALL,
    asTimeSeries = false
) => {
    let currentBlockNr = await getCurrentBlock();
    let previousBlockNr = currentBlockNr - interval;
    if (currentBlockNr === previousBlockNr) {
        return getGotchisFromBlock();
    }

    if (asTimeSeries) {
        let blocks = [];
        while (interval >= INTERVAL_DAY) {
            blocks.push(currentBlockNr - interval);
            interval -= INTERVAL_DAY;
        }

        let result = await getGotchisFromMultipleBlocks(blocks);
        return result;
    }

    let values = await Promise.all([
        getGotchisFromBlock(),
        getGotchisFromBlock(previousBlockNr),
    ]);

    console.warn(values);

    let diffValues = {
        aavegotchisClaimed:
            values[0].aavegotchisClaimed - values[1].aavegotchisClaimed,
        aavegotchisSacrificed:
            values[0].aavegotchisSacrificed - values[1].aavegotchisSacrificed,
        aavegotchisBorrowed:
            values[0].aavegotchisBorrowed - values[1].aavegotchisBorrowed,
    };

    return diffValues;
};

export const getGotchisFromBlock = async (block = 0) => {
    let query = `{block${block}: statistic(id: "0" ${
        block !== 0 ? ` block: { number: ${block}})` : ")"
    } {
      aavegotchisClaimed 
      aavegotchisSacrificed
      aavegotchisBorrowed
    }}`;

    const result = await coreMaticSubgraph({ query });
    const supplies = {
        aavegotchisClaimed: result.data["block" + block].aavegotchisClaimed,
        aavegotchisSacrificed:
            result.data["block" + block].aavegotchisSacrificed,
        aavegotchisBorrowed: result.data["block" + block].aavegotchisBorrowed,
    };

    return supplies;
};

export const getGotchisFromMultipleBlocks = async (
    blocks = [123, 345, 789, 12]
) => {
    let innerQuery = "";
    for (let i = 0; i < blocks.length; i++) {
        innerQuery =
            innerQuery +
            `block${blocks[i]}: statistic (id: "0" block: { number: ${blocks[i]}}) {
              aavegotchisClaimed 
              aavegotchisSacrificed
              aavegotchisBorrowed
    } `;
    }

    let query = `{${innerQuery}}`;
    const result = await coreMaticSubgraph({ query });
    const blockResults = Object.keys(result.data).map((e) => ({
        data: {
            aavegotchisClaimed: result.data[e].aavegotchisClaimed,
            aavegotchisSacrificed: result.data[e].aavegotchisSacrificed,
            aavegotchisBorrowed: result.data[e].aavegotchisBorrowed,
        },
        block: parseInt(e.substring(5)),
    }));

    return blockResults;
};
