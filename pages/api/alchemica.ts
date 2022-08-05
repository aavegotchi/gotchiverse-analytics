// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    values: string[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const tokens = ["FUD", "FOMO", "ALPHA", "KEK"];
    const instance = axios.create({
        baseURL: "https://aavegotchi-data-api.vercel.app",
    });
    let values = (
        await Promise.all(
            tokens.map((e) => instance.get(`/api/alchemica/${e.toLowerCase()}`))
        )
    ).map((e) => e.data.totalSupply);
    res.status(200).json({ values });
}
