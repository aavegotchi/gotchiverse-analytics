import { BigNumber } from "ethers";
import { alchemicaSubgraphClient } from "../graph/clients";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import AlchemicaChart from "./AlchemicaChart";

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

    const numbAlchemica = [
        BigNumber.from("100000000000").toNumber(),
        BigNumber.from("50000000000").toNumber(),
        BigNumber.from("25000000000").toNumber(),
        BigNumber.from("10000000000").toNumber(),
    ];

    let totalNumbAlchemica: number[] = [];
    console.log(numbAlchemica, "numbAlchemica");

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
                        {totalNumbAlchemica && mintedAlchemica && (
                            <AlchemicaChart
                                mintedAlchemica={numbAlchemica}
                                totalSupplyAlchemica={totalNumbAlchemica}
                            />
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
