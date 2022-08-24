// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql } from "@apollo/client";
import axios from "axios";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { alchemicaSubgraphClient } from "../../../../../graph/clients";

type Data = {
    symbol: string;
    supply: Number;
    circulating: string;
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

    const burnAddress = [
        "0xffffffffffffffffffffffffffffffffffffffff",
        "0x0000000000000000000000000000000000000000",
    ];

    const incentiveWallets = [
        "0x3fb6c2a83d2fffe94e0b912b612fb100047cc176",
        "0x94cb5c277fcc64c274bd30847f0821077b231022",
        "0x7e07313b4ff259743c0c84ea3d5e741d2b0d07c3",
        "0xb208f8BB431f580CC4b216826AFfB128cd1431aB",
        "0x1d0360bac7299c86ec8e99d0c1c9a95fefaf2a11",
        "0x1fe64677ab1397e20a1211afae2758570fea1b8c",
    ];

    const supplyResult = await alchemicaSubgraphClient.query({
        query: gql`
            query getSupplyDiff(
                $prevBlockNumber: Int
                $symbol: String
                $accounts: [String]
            ) {
                prev: erc20Contracts(
                    block: { number: $prevBlockNumber }
                    where: { symbol: $symbol }
                ) {
                    symbol
                    totalSupply {
                        value
                    }
                }
                prevBalances: erc20Balances(where: { account_in: $accounts }) {
                    contract {
                        symbol
                    }
                    account {
                        id
                    }
                    value
                    valueExact
                }
                current: erc20Contracts(where: { symbol: $symbol }) {
                    symbol
                    totalSupply {
                        value
                    }
                }
                currentBalances: erc20Balances(
                    where: { account_in: $accounts }
                ) {
                    contract {
                        symbol
                    }
                    account {
                        id
                    }
                    value
                    valueExact
                }
            }
        `,
        variables: {
            prevBlockNumber: prevBlockNumber,
            symbol: (req.query.symbol as string).toUpperCase(),
            accounts: burnAddress
                .map((e) => e.toLowerCase())
                .concat(incentiveWallets.map((e) => e.toLowerCase())),
        },
    });

    let prevSupply = parseFloat(supplyResult.data.prev[0].totalSupply.value);
    let currentSupply = parseFloat(
        supplyResult.data.current[0].totalSupply.value
    );

    // calculate circulating supply
    let totalSupplyPrev = BigNumber.from(
        supplyResult.data.prev[0].totalSupply.valueExact
    );
    let totalSupplyCurrent = BigNumber.from(
        supplyResult.data.current[0].totalSupply.valueExact
    );

    let circulatingSupplyPrev = BigNumber.from(totalSupplyPrev);
    let circulatingSupplyCurrent = BigNumber.from(totalSupplyCurrent);

    // subtract incentivez from circulation
    let incentivez = BigNumber.from("0");
    supplyResult.data.prevBalances
        .filter((b: any) => {
            return (
                b.contract.symbol ===
                    (req.query.symbol as string).toUpperCase() &&
                incentiveWallets.indexOf(b.account.id) !== -1
            );
        })
        .forEach((b: any) => {
            circulatingSupplyPrev = circulatingSupplyPrev.sub(b.valueExact);
            incentivez = incentivez.add(b.valueExact);
        });

    supplyResult.data.currentBalances
        .filter((b: any) => {
            return (
                b.contract.symbol ===
                    (req.query.symbol as string).toUpperCase() &&
                incentiveWallets.indexOf(b.account.id) !== -1
            );
        })
        .forEach((b: any) => {
            circulatingSupplyCurrent = circulatingSupplyCurrent.sub(
                b.valueExact
            );
            incentivez = incentivez.add(b.valueExact);
        });

    let diffCirculating = formatEther(circulatingSupplyCurrent.toString());
    let diffSupply = currentSupply;
    if ((req.query.interval as string) != "total") {
        diffSupply = currentSupply - prevSupply;
        diffCirculating = formatEther(
            circulatingSupplyCurrent.sub(circulatingSupplyPrev).toString()
        );
    }

    res.status(200).json({
        symbol: (req.query.symbol as string).toUpperCase(),
        supply: diffSupply,
        circulating: diffCirculating,
    });
};

export default handler;
