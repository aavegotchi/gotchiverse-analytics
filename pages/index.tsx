// export default Home
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

// components here
import UnflippedTile from "../components/unflipped";
import AlchemicaCard from "../components/alchemicaCard";



import UnflippedBanned from "../components/unflippedBanned";
import PoolsUnflippedV2 from "../components/poolsUnflipped2";

import Image from "next/image";
import TotalSupply from "../components/totalSupply";
import GotchiverseStatsChart from "../components/GotchiverseStatsChart";
import useSWR from "swr";
import Fetcher from "../fetcher";
import { GrassCard } from "../components/grassCard";
import { RugCard } from "../components/rugCard";
import GraphSetButtons from "../components/GraphSetButtons";
import DataCard from "../components/DataCard";




interface dataObject {
    title: string;
    dataField : string;
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
    


    
    // ============================ graph below =====================



    const [dataToBeDisplayed, setDataToBeDisplayed] = useState<string>("");


    const [graphTitle, setGraphTitle] = useState<string>("");
    
    const [graphData7d, setGraphData7d] = useState<object>({});

    const [graphData30d, setGraphData30d] = useState<object>({});
 

    const [graphObject, setGraphObject] = useState<dataObject>({
        title : "installations minted",
        dataField : "installationsMintedTotal"
    })

    useEffect(() => {

        function setData() {

            setDataToBeDisplayed("installationsMintedTotal");
            setGraphTitle("installationsMintedTotal")

        }

        setData();
    }, []);


    useEffect(() => {
        setGraphData30d(gotchiverseStats30dSeries);

    }, [gotchiverseStats30dSeries]);

    useEffect(() => {
        setGraphData7d(gotchiverseStats7dSeries);
        console.log(graphData7d, "hello world!!!");
        
    }, [gotchiverseStats7dSeries]);


    // objects 

    //======================== row 1 ==============================

    const rowOneObjects : dataObject[] = [
        {
            title: "TILES MINTED",
            dataField : "tilesMinted"
        },
        {
            title: "INSTALLATIONS MINTED",
            dataField: "installationsMintedTotal"
        },
        {
            title: "INSTALLATIONS UPGRADED TOTAL",
            dataField: "installationsUpgradedTotal"
        }
    ]

    // =========================== row 2 =============================

    const rowTwoObjects : dataObject[] = [
        {
            title: "GLTR SPENT ON CRAFTS",
            dataField: "gltrSpendOnCrafts"
        },
        {
            title: "GLTR SPENT ON UPGRADES",
            dataField: "gltrSpendOnUpgrades"
        },
        {
            title: "GLTR SPENT TOTAL",
            dataField: "gltrSpendTotal"
        }
    ]



    return (
        <>
            <div className="mainWrapper">
                <h2 className="title">Gotchiverse Economy</h2>
                <Row>
                    <Col md="9">
                        {
                            graphObject && 
                            <GotchiverseStatsChart 
                            field = {graphObject.dataField}
                            title = {graphObject.title}/>
                        }

                    </Col>
                    <Col md="3">
                        <GraphSetButtons graphObject = {graphObject} setGraphObject = {setGraphObject}/>
                    </Col>
                </Row>

                {gotchiverseStats && (
                    <Row>
                        <Col>
                            <AlchemicaCard
                                title={"TILES"}
                                values={gotchiverseStats.alchemicaSpendOnTiles}
                            />
                        </Col>
                        <Col>
                            <AlchemicaCard
                                title={"INSTALLATIONS"}
                                values={
                                    gotchiverseStats.alchemicaSpendOnInstallations
                                }
                            />
                        </Col>
                        <Col>
                            <AlchemicaCard
                                title={"UPGRADES"}
                                values={
                                    gotchiverseStats.alchemicaSpendOnUpgrades
                                }
                            />
                        </Col>
                    </Row>
                )}
                <Row>
                    {
                        rowOneObjects.map((data, index) => {
                            return (
                                <Col>
                                    <DataCard 
                                    key = {index}
                                    title = {data.title} 
                                    dataField = {data.dataField}
                                    />
                                </Col>

                            )

                        })
                    }
                </Row>
                {/* <Row>
                {
                    rowTwoObjects.map((data, index) => {
                        return (
                            <Col>
                                <DataCard 
                                key = {index}
                                title = {data.title} 
                                dataField = {data.dataField}
                                />
                            </Col>

                        )
                    })
                }

                </Row> */}




                <Row>
                    {gotchiverseStats &&
                        gotchiverseStats1d &&
                        gotchiverseStats7d &&
                        gotchiverseStats30d && (
                            <Col>
                                <UnflippedTile
                                    data={
                                        gotchiverseStats.installationsMintedTotal
                                    }
                                    data1d={
                                        gotchiverseStats1d.installationsMintedTotal
                                    }
                                    data7d={
                                        gotchiverseStats7d.installationsMintedTotal
                                    }
                                    data30d={
                                        gotchiverseStats30d.installationsMintedTotal
                                    }
                                    title={"installationsMintedTotal"}
                                    setGraph = { (titleName : string ) => {
                                        setDataToBeDisplayed(titleName);
                                        console.log("ran");
                                        console.log(dataToBeDisplayed);
                                    }
                                        
                                    }
                                />
                            </Col>
                        )}
                    {gotchiverseStats &&
                        gotchiverseStats1d &&
                        gotchiverseStats7d &&
                        gotchiverseStats30d && (
                            <Col>
                                <UnflippedTile
                                    data={gotchiverseStats.tilesMinted}
                                    data1d={gotchiverseStats1d.tilesMinted}
                                    data7d={gotchiverseStats7d.tilesMinted}
                                    data30d={gotchiverseStats30d.tilesMinted}
                                    title={"TILES MINTED"}
                                    setGraph = { (titleName : string ) => {
                                        setDataToBeDisplayed(titleName);
                                    }}

                                />
                            </Col>
                        )}

                    {gotchiverseStats &&
                        gotchiverseStats1d &&
                        gotchiverseStats7d &&
                        gotchiverseStats30d && (
                            <Col>
                                <UnflippedTile
                                    data={gotchiverseStats.gltrSpendTotal}
                                    data1d={gotchiverseStats1d.gltrSpendTotal}
                                    data7d={gotchiverseStats7d.gltrSpendTotal}
                                    data30d={gotchiverseStats30d.gltrSpendTotal}
                                    title={"GLTR BURNED"}
                                    setGraph = { (titleName : string ) => {
                                        setDataToBeDisplayed(titleName);
                                    }
                                }
                                />
                            </Col>
                        )}
                </Row>

                <Row>
                    <Col>
                        {/* <Card>Number of players banned vs total players</Card> */}
                        <UnflippedBanned
                            data={100}
                            data1d={1}
                            data7d={7}
                            data30d={30}
                            title={"PLAYERS"}
                        />
                    </Col>
                    <Col>
                        {/* <Card>Amount of Alchemica Sold by banned players</Card> */}
                        <UnflippedBanned
                            data={100}
                            data1d={1}
                            data7d={7}
                            data30d={30}
                            title={"BANNED PLAYERS"}
                        />
                    </Col>
                    <Col>
                        {/* <Card>Number of players banned</Card> */}
                        <UnflippedBanned
                            data={100}
                            data1d={1}
                            data7d={7}
                            data30d={30}
                            title={"ALCHEMICA SOLD BY BANNED PLAYERS"}
                        />
                    </Col>
                    <Col>
                        {/* <Card>Number of players banned</Card> */}
                        <UnflippedBanned
                            data={100}
                            data1d={1}
                            data7d={7}
                            data30d={30}
                            title={"UNBANNED PLAYERS"}
                        />
                    </Col>
                </Row>


                

                {gotchiStats && (
                    <>
                        <h2 className="title">Gotchi Utiliziation</h2>
                        <Row>
                            <Col>
                                {/* <Card>Number of Gotchis summoned</Card> */}
                                <UnflippedBanned
                                    data={gotchiStats.aavegotchisClaimed}
                                    data1d={gotchiStats.aavegotchisClaimed}
                                    data7d={gotchiStats.aavegotchisClaimed}
                                    data30d={gotchiStats.aavegotchisClaimed}
                                    title={"GOTCHIS SUMMONED"}
                                />
                            </Col>
                            <Col>
                                {/* <Card>Number of Gotchis sacrificed</Card> */}
                                <UnflippedBanned
                                    data={gotchiStats.aavegotchisSacrificed}
                                    data1d={gotchiStats.aavegotchisSacrificed}
                                    data7d={gotchiStats.aavegotchisSacrificed}
                                    data30d={gotchiStats.aavegotchisSacrificed}
                                    title={"GOTCHIS SACRIFICED"}
                                />
                            </Col>
                            <Col>
                                {/* <Card>Number of Gotchis borrowed (24h, 7d, 30d)</Card> */}
                                <UnflippedBanned
                                    data={gotchiStats.aavegotchisBorrowed}
                                    data1d={gotchiStats.aavegotchisBorrowed}
                                    data7d={gotchiStats.aavegotchisBorrowed}
                                    data30d={gotchiStats.aavegotchisBorrowed}
                                    title={"GOTCHIS BORROWED"}
                                />
                            </Col>
                            <Col>
                                {/* <Card>Number of Gotchis channeled (24h, 7d, 30d)</Card> */}
                                <UnflippedBanned
                                    data={gotchiStats.aavegotchisBorrowed}
                                    data1d={gotchiStats.aavegotchisBorrowed}
                                    data7d={gotchiStats.aavegotchisBorrowed}
                                    data30d={gotchiStats.aavegotchisBorrowed}
                                    title={"GOTCHIS SACRIFICED FILLER"}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <GrassCard
                                    types={grassResponse.data}
                                ></GrassCard>
                            </Col>
                            <Col md={3}>
                                <RugCard types={rugResponse.data}></RugCard>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
            <style jsx>
                {`
                    .rowWrapper {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                    }

                    .oneCard {
                        flex: 1;
                        margin: 2px;
                    }

                    .title {
                        width: 85%;
                        text-align: left;
                        font-size: 46px;
                        font-weight: 400;
                        line-height: 42.73px;
                        color: black;
                    }
                    .image__Wrapper {
                        border-radius: 5px;
                        overflow: hidden;
                        position: relative;
                        height: 100%;
                        width: 100%;
                    }

                    .mainWrapper {
                        width: 1100px;

                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
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
