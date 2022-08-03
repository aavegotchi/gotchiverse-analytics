import useSWR from "swr";
import Fetcher from "../fetcher";
import Image from "next/image";
import SuffixShortener from "./helperFunctions/SuffixShortener";
import ethers, { BigNumber } from "ethers";
import { alchemicaSubgraphClient } from "../graph/clients";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { BigDecimal } from "@graphprotocol/graph-ts";

const coins: string[] = ["FUD", "FOMO", "ALPHA", "KEK"];

enum AlchemicaToken {
    "FUD",
    "FOMO",
    "ALPHA",
    "KEK",
}

interface AlchemicaValues {
    FUD: BigNumber;
    FOMO: BigNumber;
    ALPHA: BigNumber;
    KEK: BigNumber;
}

interface ERC20Contract {
    symbol: string;
    totalSupply: {
        value: string;
    };
}

function AlchemicaBarChart() {
    const tokens = ["FUD", "FOMO", "ALPHA", "KEK"];
    const mintedAlchemica = [
        BigNumber.from("100000000000"),
        BigNumber.from("50000000000"),
        BigNumber.from("25000000000"),
        BigNumber.from("10000000000"),
    ];

    const [totalSupplyAlchemica, setTotalSupplyAlchemica] =
        useState(mintedAlchemica);

    let fetchTotalSupply = async () => {
        const result = await alchemicaSubgraphClient.query({
            query: gql`
                query GetTotalSupply {
                    erc20Contracts {
                        symbol
                        totalSupply {
                            value
                        }
                    }
                }
            `,
        });

        let newData = tokens.map((e: string) =>
            BigNumber.from(
                result.data.erc20Contracts
                    .filter((f: ERC20Contract) => e == f.symbol)[0]
                    .totalSupply.value.split(".")[0]
            )
        );
        console.log(newData);
        setTotalSupplyAlchemica(newData);
    };

    useEffect(() => {
        fetchTotalSupply();
    });

    return (
        <section>
            <div className="wrapper">
                <div className="title">Alchmica minted vs. Total supply</div>
                <div className="body">
                    Total Supply in Mio:{" "}
                    {JSON.stringify(
                        totalSupplyAlchemica.map((e) => e.toNumber())
                    )}
                    Minted in Mio:{" "}
                    {JSON.stringify(mintedAlchemica.map((e) => e.toNumber()))}
                </div>
            </div>
            <style jsx>
                {`
                    .wrapper {
                        color: black;
                        border: 1px solid #000000;
                        background: white;
                        height: 210px;
                        width: 100%;
                        position: relative;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                    }

                    .title {
                        height: 100px;
                        font-size: 30px;
                        width: 80%;
                        padding-top: 15px;
                        padding-left: 20px;
                        line-height: 100%;
                        font-weight: 800;
                    }

                    .body {
                        display: flex;
                        flex-wrap: wrap;
                    }
                `}
            </style>
        </section>
    );
}

export default AlchemicaBarChart;
