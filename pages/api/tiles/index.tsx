// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql } from "@apollo/client";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { gotchiverseSubgraphClient } from "../../../graph/clients";

interface Tile {
    name: string;
    amount: string;
    uri: string;
}

type Data = {
    tileTypes: string[];
};

export default async function (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const result = await gotchiverseSubgraphClient.query({
        query: gql`
            query fetchAllTiles {
                tileTypes {
                    name
                    amount
                    uri
                }
            }
        `,
    });

    res.status(200).json(
        result.data.tileTypes.map((e: Tile) => ({
            ...e,
            amount: parseInt(e.amount),
        }))
    );
}