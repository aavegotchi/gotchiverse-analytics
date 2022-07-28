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

export const getGotchisFromMultipleBlocks = (blocks: Array<Number>) => {};

export const getGotchisFromBlock = async (block: Number = 0) => {
    if (block == 0) {
        return getGotchis();
    }

    let query = `{statistic(id: "0" block: { number: "${block}"}) {
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
        return getGotchisFromMultipleBlocks(blocks);
    }

    let values = await Promise.all([
        getGotchisFromBlock(),
        getGotchisFromBlock(previousBlockNr),
    ]);

    let diffValues = values[0].map((e, i) => ({
        name: e.name,
        totalSupply: e.totalSupply - values[1][i].totalSupply,
    }));

    return diffValues;
};
