// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql } from "@apollo/client";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { alchemicaSubgraphClient } from "../../../../../graph/clients";

type Data = {
    symbol: string;
    supply: Number;
};

export const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    const tokens = ["FUD", "FOMO", "ALPHA", "KEK"];
    const instance = axios.create({
        baseURL: "https://data.aavegotchi.com",
    });

    const blockResult = await alchemicaSubgraphClient.query({
        query: gql`
            query getBlockNumber {
                _meta {
                    block {
                        number
                    }
                }
            }
        `,
    });

    const currentBlockNumber = parseInt(blockResult.data._meta.block.number);
    let prevBlockNumber = currentBlockNumber - 1;
    if ((req.query.interval as string) != "total") {
        prevBlockNumber =
            currentBlockNumber - parseInt(req.query.interval as string) * 43200;
    }

    const supplyResult = await alchemicaSubgraphClient.query({
        query: gql`
            query getSupplyDiff($prevBlockNumber: Int, $symbol: String) {
                prev: erc20Contracts(
                    block: { number: $prevBlockNumber }
                    where: { symbol: $symbol }
                ) {
                    symbol
                    totalSupply {
                        value
                    }
                }
                current: erc20Contracts(where: { symbol: $symbol }) {
                    symbol
                    totalSupply {
                        value
                    }
                }
            }
        `,
        variables: {
            prevBlockNumber: prevBlockNumber,
            symbol: (req.query.symbol as string).toUpperCase(),
        },
    });

    let prevSupply = parseFloat(supplyResult.data.prev[0].totalSupply.value);
    let currentSupply = parseFloat(
        supplyResult.data.current[0].totalSupply.value
    );

    let diffSupply = currentSupply;
    if ((req.query.interval as string) != "total") {
        diffSupply = currentSupply - prevSupply;
    }

    res.status(200).json({
        symbol: (req.query.symbol as string).toUpperCase(),
        supply: diffSupply,
    });
};

export default handler;
