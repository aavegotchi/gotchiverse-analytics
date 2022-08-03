import { BigNumber } from "ethers";
import { alchemicaSubgraphClient } from "../graph/clients";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import BarChart from "./charts/BarChart";

interface ERC20Contract {
    symbol: string;
    totalSupply: {
        value: string;
    };
}

interface data {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    backgroundColor: string;
    tension: number;
}

function AlchemicaBarChart() {
    let datasets: data[] = [];
    let totalNumbAlchemica: number[] = [];
    const tokens = ["FUD", "FOMO", "ALPHA", "KEK"];
    const mintedAlchemica = [
        BigNumber.from("100000000000"),
        BigNumber.from("50000000000"),
        BigNumber.from("25000000000"),
        BigNumber.from("10000000000"),
    ];

    const getAlchemicaNumb = () => {
        let result: number[] = [];

        mintedAlchemica.forEach((bigNum, index) => {
            result[index] = bigNum.toNumber();
        });

        return result;
    };

    const getTotalSupplyAlchemicaNumb = () => {
        let result: number[] = [];

        totalSupplyAlchemica?.forEach((bigNumber, index) => {
            result[index] = bigNumber.toNumber();
        });
        return result;
    };

    const [totalSupplyAlchemica, setTotalSupplyAlchemica] =
        useState<Array<BigNumber> | null>(null);

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
        console.log("newDataaae", newData);

        setTotalSupplyAlchemica(newData);
    };

    useEffect(() => {
        if (!totalSupplyAlchemica) {
            fetchTotalSupply();
        }
    });

    if (totalSupplyAlchemica) {
        totalSupplyAlchemica.forEach((data, index) => {
            totalNumbAlchemica[index] = data.toNumber();
        });
    }

    const numbAlchemica = getAlchemicaNumb();
    if (totalSupplyAlchemica) {
        totalNumbAlchemica = getTotalSupplyAlchemicaNumb();
    }

    if (numbAlchemica && totalSupplyAlchemica) {
        datasets = [
            {
                label: "Total Alchemica Minted",
                data: numbAlchemica,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "#622FEE",
                tension: 0.1,
            },
            {
                label: "Total Supply Of Alchemica",
                data: totalNumbAlchemica,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "#FA34F3",
                tension: 0.1,
            },
        ];
    }

    return (
        <section>
            <div className="wrapper">
                <div className="title">Alchmica minted vs. Total supply</div>
                <div className="body">
                    {/* {totalSupplyAlchemica && (
                        <>
                            Total Supply{" "}
                            {JSON.stringify(
                                totalSupplyAlchemica.map((e) => e.toNumber())
                            )}
                        </>
                    )}
                    Minted{" "}
                    {JSON.stringify(mintedAlchemica.map((e) => e.toNumber()))} */}
                    <div className="body_graph_wrapper">
                        {datasets && mintedAlchemica && (
                            <BarChart labels={tokens} dataSets={datasets} />
                        )}
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .wrapper {
                        color: black;
                        border: 1px solid #000000;
                        background: white;
                        height: 410px;
                        width: 100%;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        position: relative;
                    }

                    .title {
                        height: 100px;
                        font-size: 30px;
                        width: 80%;
                        padding-top: 15px;
                        padding-left: 20px;
                        line-height: 100%;
                        font-weight: 800;
                        text-align: center;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    .body {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                `}
            </style>
        </section>
    );
}

export default AlchemicaBarChart;
