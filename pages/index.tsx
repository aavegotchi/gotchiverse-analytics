// export default Home
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

// components here
import UnflippedTile from "../components/unflipped";
import AlchemicaCardData from "../components/AlchemicaCardData";
import AlchemicaCardDataV2 from "../components/AlchemicaCardDataV2";
import DataCardLazyLoad from "../components/DataCardLazyLoad";
import GrassRugData from "../components/GrassRugData";
import GrassRugCombinedRow from "../components/GrassRugCombinedRow";

import UnflippedBanned from "../components/unflippedBanned";
import PoolsUnflippedV2 from "../components/poolsUnflipped2";
import StakingPools from "../components/StakingPools";
import Image from "next/image";
import TotalSupply from "../components/totalSupply";
import GotchiverseStatsChart from "../components/GotchiverseStatsChart";
import useSWR from "swr";
import Fetcher from "../fetcher";
import { GrassCard } from "../components/grassCard";
import { RugCard } from "../components/rugCard";
import GraphSetButtons from "../components/GraphSetButtons";
import DataCard from "../components/DataCard";
import SmallDataCard from "../components/SmallDataCard";

interface dataObject {
    title: string;
    dataField: string;
}

const Home: NextPage = () => {
    let alchemicaTotalResponse = useSWR("/api/alchemica/supply", Fetcher);
    let alchemicaTotal = alchemicaTotalResponse.data;

    let alchemica7dResponse = useSWR("/api/alchemica/supply/7", Fetcher);
    let alchemica7d = alchemica7dResponse.data;

    let alchemica7dSeriesResponse = useSWR(
        "/api/alchemica/supply/7/series",
        Fetcher
    );
    let alchemica7dSeries = alchemica7dSeriesResponse.data;
    let gotchivereStatsResponse = useSWR("/api/gotchiverse/stats", Fetcher);
    let gotchiverseStats = gotchivereStatsResponse.data;

    let gotchiverseStats7dResponse = useSWR(
        "/api/gotchiverse/stats/7",
        Fetcher
    );
    let gotchiverseStats1dResponse = useSWR(
        "/api/gotchiverse/stats/1",
        Fetcher
    );
    let gotchiverseStats30dResponse = useSWR(
        "/api/gotchiverse/stats/30",
        Fetcher
    );

    let gotchisResponse = useSWR("/api/gotchis/stats", Fetcher);
    let grassResponse = useSWR("/api/grass", Fetcher);
    let rugResponse = useSWR("/api/rugs", Fetcher);
    let gotchiStats = gotchisResponse.data;
    let gotchiverseStats7d = gotchiverseStats7dResponse.data;
    let gotchiverseStats1d = gotchiverseStats1dResponse.data;
    let gotchiverseStats30d = gotchiverseStats30dResponse.data;

    let gotchiverseStats7dSeriesResponse = useSWR(
        "/api/gotchiverse/stats/7/series",
        Fetcher
    );

    let gotchiverseStates30dSeriesResponse = useSWR(
        "/api/gotchiverse/stats/30/series",
        Fetcher
    );

    let gotchiverseStats7dSeries = gotchiverseStats7dSeriesResponse.data; // gotchiverseStats 7 days data

    let gotchiverseStats30dSeries = gotchiverseStates30dSeriesResponse.data; // gotchiverseStats 30 days data

    let activeWallets = useSWR("/api/alchemica/");

    console.log("gotchiverseStats (Total)", gotchiverseStats);
    console.log("1d day series data here", gotchiverseStats1d);
    console.log("g7 day series data here  ", gotchiverseStats7d);
    console.log("30d day series data here", gotchiverseStats30d);

    let gotchisRes = useSWR("/api/gotchis/stats", Fetcher);

    let gotchisRes7 = useSWR("/api/gotchis/stats/7", Fetcher);

    // ============================ graph below =====================

    const [dataToBeDisplayed, setDataToBeDisplayed] = useState<string>("");

    const [graphTitle, setGraphTitle] = useState<string>("");

    const [graphData7d, setGraphData7d] = useState<object>({});

    const [graphData30d, setGraphData30d] = useState<object>({});

    const [graphObject, setGraphObject] = useState<dataObject>({
        title: "installations minted",
        dataField: "installationsMintedTotal",
    });

    useEffect(() => {
        function setData() {
            setDataToBeDisplayed("installationsMintedTotal");
            setGraphTitle("installationsMintedTotal");
        }

        setData();
    }, []);

    // objects

    // ======================= Alchemica stuff =====================

    const alchemicaObjects: dataObject[] = [
        {
            title: "ALCHEMICA SPENT ON TILES",
            dataField: "alchemicaSpendOnTiles",
        },
        {
            title: "ALCHEMICA SPENT ON INSTALLATIONS",
            dataField: "alchemicaSpendOnInstallations",
        },
        {
            title: "ALCHEMICA SPENT ON UPGRADES",
            dataField: "alchemicaSpendOnUpgrades",
        },
    ];
    //======================== row 1 ==============================

    const rowOneObjects: dataObject[] = [
        {
            title: "TILES MINTED",
            dataField: "tilesMinted",
        },
        {
            title: "INSTALLATIONS MINTED",
            dataField: "installationsMintedTotal",
        },
        {
            title: "INSTALLATIONS UPGRADED TOTAL",
            dataField: "installationsUpgradedTotal",
        },
    ];

    // =========================== row 2 =============================

    const rowTwoObjects: dataObject[] = [
        {
            title: "GLTR SPENT ON CRAFTS",
            dataField: "gltrSpendOnCrafts",
        },
        {
            title: "GLTR SPENT ON UPGRADES",
            dataField: "gltrSpendOnUpgrades",
        },
        {
            title: "GLTR SPENT TOTAL",
            dataField: "gltrSpendTotal",
        },
    ];

    // ====================== gotchiObjects =================================

    const gotchisObjects: dataObject[] = [
        {
            title: "GOTCHIS BORROWED",
            dataField: "aavegotchisBorrowed",
        },
        {
            title: "GOTCHIS CLAIMED",
            dataField: "aavegotchisClaimed",
        },
        {
            title: "GOTCHIS SACRIFICED",
            dataField: "aavegotchisSacrificed",
        },
        {
            title: "GOTCHIS CHANNELED",
            dataField: "aavegotchisChanneled",
        },
    ];

    // ================== last row ==============================

    console.log(grassResponse, "grass response");
    console.log(rugResponse, "rug Response");

    const grassRow: dataObject[] = [
        {
            title: "LE PURPLE GRASS",
            dataField: "",
        },
    ];

    return (
        <>
            <div className="mainWrapper">
                <h2 className="title">Gotchiverse Economy</h2>
                <Row>
                    {alchemicaObjects.map((alchemica, index) => {
                        return (
                            <Col key={index}>
                                <AlchemicaCardDataV2
                                    title={alchemica.title}
                                    dataField={alchemica.dataField}
                                />
                            </Col>
                        );
                    })}
                </Row>
                <Row>
                    <Col md="8">
                        {graphObject && (
                            <GotchiverseStatsChart
                                field={graphObject.dataField}
                                title={graphObject.title}
                            />
                        )}
                    </Col>
                    <Col md="4">
                        <div className="pools_wrapper">
                            <StakingPools />
                            <StakingPools />
                        </div>
                    </Col>
                </Row>
                <Row>
                    {rowOneObjects.map((data, index) => {
                        return (
                            <Col key={index}>
                                <DataCard
                                    title={data.title}
                                    dataField={data.dataField}
                                />
                            </Col>
                        );
                    })}
                </Row>

                <h2 className="title">Gotchi Utiliziation</h2>
                <Row>
                    {gotchisObjects.map((gotchiObject, index) => {
                        return (
                            <Col key={index}>
                                <SmallDataCard
                                    title={gotchiObject.title}
                                    dataField={gotchiObject.dataField}
                                />
                            </Col>
                        );
                    })}
                </Row>
                <h2 className="title">Grass and Rugs</h2>
                {/* <div className="wrapper_helper">
                    <GrassRugData queryURL={"/api/grass"} />
                    <GrassRugData queryURL={"/api/rugs"} />
                </div> */}
                <GrassRugCombinedRow />

                {/* <Row>
                    <Col md={3}>
                        <GrassCard
                            types={grassResponse.data}
                        ></GrassCard>
                    </Col>
                    <Col md={3}>
                        <RugCard types={rugResponse.data}></RugCard>
                    </Col>
                </Row> */}

                {/* <h2 className="title">Rugs</h2>
                <GrassRugData queryURL={"/api/rugs"} /> */}
                {/* <Row>
                    <Col md={3}>
                        <GrassCard types={grassResponse.data}></GrassCard>
                    </Col>
                    <Col md={3}>
                        <RugCard types={rugResponse.data}></RugCard>
                    </Col>
                </Row> */}
            </div>
            <style jsx>
                {`
                    .title {
                        width: 85%;
                        text-align: left;
                        font-size: 46px;
                        font-weight: 400;
                        line-height: 42.73px;
                        color: black;
                    }

                    .pools_wrapper {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }

                    .mainWrapper {
                        width: 1100px;

                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }

                    .wrapper_helper {
                        display: flex;
                        justify-content: space-around;
                        gap: 22px;
                    }

                    @media (max-width: 600px) {
                        .mainWrapper {
                            width: 100%;
                            flex-direction: column;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default Home;
