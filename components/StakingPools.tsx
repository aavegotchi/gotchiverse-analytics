import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { gltrStakingSubgraphClient } from "../graph/clients";
import { gql } from "@apollo/client";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

interface GltrPool {
    allocPoint: BigNumber;
    userBalance: BigNumber;
    lpToken: string;
    pending: BigNumber;
    poolBalance: BigNumber;
}

interface PoolDetails {
    name: string;
    url: string;
}

interface PoolInfo {
    [lpToken: string]: PoolDetails;
}

const poolInfo: PoolInfo = {
    "0x73958d46b7aa2bc94926d8a215fa560a5cdca3ea": {
        name: "wapGHST",
        url: "https://app.aave.com/reserve-overview/?underlyingAsset=0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7&marketName=proto_polygon_v3",
    },
    "0xfec232cc6f0f3aeb2f81b2787a9bc9f6fc72ea5c": {
        name: "GHST-FUD",
        url: "https://quickswap.exchange/#/add/0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7/0x403E967b044d4Be25170310157cB1A4Bf10bdD0f",
    },
    "0x641ca8d96b01db1e14a5fba16bc1e5e508a45f2b": {
        name: "GHST-FOMO",
        url: "https://quickswap.exchange/#/add/0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7/0x44A6e0BE76e1D9620A7F76588e4509fE4fa8E8C8",
    },
    "0xc765eca0ad3fd27779d36d18e32552bd7e26fd7b": {
        name: "GHST-ALPHA",
        url: "https://quickswap.exchange/#/add/0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7/0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2",
    },
    "0xbfad162775ebfb9988db3f24ef28ca6bc2fb92f0": {
        name: "GHST-KEK",
        url: "https://quickswap.exchange/#/add/0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7/0x42E5E06EF5b90Fe15F853F59299Fc96259209c5C",
    },
    "0x096c5ccb33cfc5732bcd1f3195c13dbefc4c82f4": {
        name: "GHST-USDC",
        url: "https://quickswap.exchange/#/add/0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    },
    "0xf69e93771f11aecd8e554aa165c3fe7fd811530c": {
        name: "GHST-MATIC",
        url: "https://app.sushi.com/analytics/pools/0xf69e93771f11aecd8e554aa165c3fe7fd811530c?chainId=137",
    },
    "0xb0e35478a389dd20050d66a67fb761678af99678": {
        name: "GHST-GLTR",
        url: "https://quickswap.exchange/#/add/0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7/0x3801C3B3B5c98F88a9c9005966AA96aa440B9Afc",
    },
};

function StakingPools(): JSX.Element {
    const [data, setData] = useState<Array<any> | null>();
    const [currentViewIndex, setCurrentViewIndex] = useState<number>(0);

    const getPool = (id: string): PoolDetails => {
        console.log(id);
        return poolInfo[id];
    };

    const fetchData = async () => {
        const result = await gltrStakingSubgraphClient.query({
            query: gql`
                query GetStakingPools($account: String, $pools: [String]) {
                    erc20Balances(
                        where: { account: $account, contract_in: $pools }
                    ) {
                        account {
                            id
                        }
                        contract {
                            id
                            symbol
                            totalSupply {
                                value
                                valueExact
                            }
                        }
                        value
                        valueExact
                    }
                }
            `,
            variables: {
                account: "0x1fe64677ab1397e20a1211afae2758570fea1b8c",
                pools: Object.keys(poolInfo),
            },
        });
        console.log(result.data);
        setData(
            result.data.erc20Balances.map((e: any) => {
                let totalSupply = BigNumber.from(
                    e.contract.totalSupply.valueExact
                );
                let balance = BigNumber.from(e.valueExact);
                let amountStaked = balance.mul(100).div(totalSupply);

                let totalSupplyFormatted = formatEther(totalSupply);
                let balanceFormatted = formatEther(balance);
                let pool = getPool(e.contract.id);
                return {
                    totalSupply: parseFloat(totalSupplyFormatted),
                    balance: parseFloat(balanceFormatted),
                    amountStaked: parseFloat(amountStaked.toString()),
                    name: pool.name,
                    url: pool.url,
                };
            })
        );
    };

    useEffect(() => {
        if (!data) {
            fetchData();
        }
    });

    useEffect(() => {
        if (data) {
            console.log(data, "fetchedd", typeof data, data[0]);
        }
    }, [data]);

    return (
        <section className="wrapperOverall">
            {data && (
                <div className="wrapper">
                    <div className="bodyWrapper">
                        <div className="left">
                            <button
                                className="button button_left"
                                onClick={() => {
                                    setCurrentViewIndex(currentViewIndex - 1);
                                }}
                                disabled={currentViewIndex === 0}
                            >
                                <Image
                                    src={`/static/images/chevron-left.png`}
                                    alt="chevron"
                                    width="50"
                                    height="50"
                                />
                            </button>
                        </div>
                        <div className="center">
                            <div className="tileHeader">
                                <span className="tileHeader">GLTR STAKING</span>
                            </div>

                            <div className="dataContainerv2">
                                <div className="circularBarWrapperv2">
                                    <a
                                        target="_blank"
                                        href={data[currentViewIndex].url}
                                    >
                                        <CircularProgressbar
                                            value={
                                                data[currentViewIndex]
                                                    .amountStaked
                                            }
                                            text={`${data[currentViewIndex].amountStaked} %`}
                                            styles={buildStyles({
                                                strokeLinecap: "flat",
                                                pathTransitionDuration: 0.5,
                                                textSize: "30px",
                                                textColor: "black",
                                                pathColor: "#FA34F3",
                                                trailColor: "#858585",
                                                rotation: 0.25,
                                            })}
                                        />
                                    </a>
                                </div>
                                <div className="mainDatav2">
                                    <div className="heading">
                                        <span className="heading_Name">
                                            TOTAL STAKED:
                                        </span>
                                    </div>

                                    <div className="tileTitle">
                                        {data[currentViewIndex].name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="arrows right">
                            <button
                                className="button button_right"
                                onClick={() => {
                                    setCurrentViewIndex(currentViewIndex + 1);
                                }}
                                disabled={currentViewIndex >= data.length - 1}
                            >
                                <Image
                                    src={`/static/images/chevron-right.png`}
                                    alt="chevron"
                                    width="50"
                                    height="50"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>
                {`
                    .center {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        flex: 4;
                    }

                    .heading {
                        margin-bottom: 15px;
                    }

                    .wrapperOverall {
                        height: 100%;
                    }

                    .left {
                        transform: translateX(-20%);
                    }

                    .right {
                        transform: translateX(20%);
                    }

                    .tileHeader {
                        font-size: 32px;
                        font-weight: 800;
                        font-style: normal;
                        text-transform: uppercase;
                    }

                    .bodyWrapper {
                        display: flex;

                        align-items: center;
                        justify-content: space-around;
                        height: 100%;
                        width: 100%;
                    }

                    .dataContainerv2 {
                        height: 100%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        flex-direction: column;
                    }

                    .heading_Name {
                        font-size: 35px;
                        line-height: 29px;
                        font-weight: 800;
                    }

                    .tileHeader {
                        text-align: center;
                    }

                    .mainDatav2 {
                        height: 100%;

                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding-top: 40px;
                        width: 100%;
                        padding-bottom: 10px;
                    }

                    .circularBarWrapperv2 {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        width: 180px;
                        padding-top: 20px;
                    }
                    .wrapper {
                        display: flex;
                        color: black;
                        background: white;
                        width: 100%;
                        height: 100%;

                        border: 1px solid black;

                        overflow: hidden;
                    }

                    .bodyItem {
                        flex: 1;
                        margin: 0px 20px;
                        padding: 30px;

                        cursor: pointer;
                    }

                    .tileTitle {
                        font-size: 40px;
                        font-weight: 400;
                        line-height: 29px;
                        text-align: center;
                    }

                    .dataContainer {
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                        text-align: center;
                        flex-direction: column;
                        width: 100%;
                    }

                    .dataWrapper {
                        width: 100px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        flex: 1;
                    }

                    .mainData {
                        font-size: 35px;
                        font-weight: 600;
                        padding: 10px;
                    }

                    .dataChanges {
                        display: flex;
                        align-items: center;
                        margin-left: 20px;
                    }

                    .button {
                        width: 70px;
                        margin: 2px;
                        background: transparent;
                        border: none;
                        text-align: center;
                        color: #04b6bc;
                        height: 50px;
                        padding: 5px;
                    }

                    .button_left:hover {
                        transform: translateX(10px);
                        transition: 0.2s ease-in-out;
                    }

                    .button_right:hover {
                        transform: translateX(-10px);
                        transition: 0.5s ease-in-out;
                    }
                `}
            </style>
        </section>
    );
}

export default StakingPools;
