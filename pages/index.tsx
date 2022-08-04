// export default Home
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

// components here
import AlchemicaCardDataV2 from "../components/AlchemicaCardDataV2";
import GrassRugCombinedRow from "../components/GrassRugCombinedRow";
import FakeGotchisDonutChart from "../components/FakeGotchisDonutChart";
import GotchisStats from "../components/GotchisStats";
import StakingPools from "../components/StakingPools";
import DataCard from "../components/DataCard";
import AlchemicaBarChart from "../components/AlchemicaBarChart";

interface dataObject {
    title: string;
    dataField: string;
}

const Home: NextPage = () => {
    // ============================ graph below =====================

    const [dataToBeDisplayed, setDataToBeDisplayed] = useState<string>("");

    const [graphTitle, setGraphTitle] = useState<string>("");

    const [graphData7d, setGraphData7d] = useState<object>({});

    const [graphData30d, setGraphData30d] = useState<object>({});

    const [graphObject, setGraphObject] = useState<dataObject>({
        title: "INSTALLATIONS MINTED",
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
                        <AlchemicaBarChart />
                    </Col>
                    <Col md="4">
                        <StakingPools />
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
                <GotchisStats />
                <h2 className="title">Grass and Rugs</h2>
                <GrassRugCombinedRow />
                <h2 className="title">Fake Gotchis Owner Graph</h2>
                <Row>
                    <FakeGotchisDonutChart />
                </Row>
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

                    .debug {
                        height: 100%;
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
