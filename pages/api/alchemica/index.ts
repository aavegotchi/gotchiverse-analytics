// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    values: string[];
};

export const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    const tokens = ["FUD", "FOMO", "ALPHA", "KEK"];
    const instance = axios.create({
        baseURL: "https://data.aavegotchi.com",
    });

    return await Promise.all(
        tokens.map((e) => instance.get(`/api/alchemica/${e.toLowerCase()}`))
    )
        .then((promisses) => promisses.map((e) => e.data.totalSupply))
        .then((values: Array<string>) => res.status(200).json({ values }));
};

export default handler;
