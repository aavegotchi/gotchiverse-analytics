import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import Fetcher from "../fetcher";

interface DataCardProps {
    title: string;
    dataField: string;
}

const buttons: number[] = [24, 7, 30, 100];

function DataCard({ title, dataField }: DataCardProps) {
    const [timeLine, setTimeLine] = useState<number>(3);
    const [displayData, setDisplayData] = useState<number>(0);
    const [trend, setTrend] = useState<number>(0);
    const [trendClass, setTrendClass] = useState<string>("body_trend_positive");

    let dataArray: string[] = [];

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

    let gotchivereStatsResponse = useSWR("/api/gotchiverse/stats", Fetcher);

    if (
        gotchivereStatsResponse.data &&
        gotchiverseStats30dResponse.data &&
        gotchiverseStats1dResponse.data &&
        gotchiverseStats7dResponse.data
    ) {
        dataArray = [
            gotchiverseStats1dResponse.data[dataField],
            gotchiverseStats7dResponse.data[dataField],
            gotchiverseStats30dResponse.data[dataField],
            gotchivereStatsResponse.data[dataField],
        ];
        dataArray.forEach((element, index) => {
            dataArray[index] = element.toString();
        });
    }

    // const retrieveData = () => {
    //     let gotchiverseStats7dResponse = useSWR(
    //         "/api/gotchiverse/stats/7",
    //         Fetcher
    //     );

    //     let gotchiverseStats1dResponse = useSWR(
    //         "/api/gotchiverse/stats/1",
    //         Fetcher
    //     );

    //     let gotchiverseStats30dResponse = useSWR(
    //         "/api/gotchiverse/stats/30",
    //         Fetcher
    //     );

    //     let gotchivereStatsResponse = useSWR(
    //         "/api/gotchiverse/stats",
    //         Fetcher
    //     );

    //     if (gotchivereStatsResponse.data && gotchiverseStats30dResponse.data && gotchiverseStats1dResponse.data && gotchiverseStats7dResponse.data) {
    //         console.log(gotchivereStatsResponse.data, "collected");
    //         dataArray = [gotchiverseStats1dResponse.data[dataField], gotchiverseStats7dResponse.data[dataField], gotchiverseStats30dResponse.data[dataField], gotchivereStatsResponse.data[dataField]];
    //         dataArray.forEach((element, index) => {
    //             dataArray[index] = element.toString();
    //         })
    //     }

    // }

    // retrieveData();

    useEffect(() => {
        function calculateAndSetTrend() {
            let className: string = "body_trend_";
            // const amountTotal : number = parseInt(dataArray[3], 10);
            // now - the amount at that time period ago
            const changes: number =
                parseInt(dataArray[timeLine], 10) /
                (parseInt(dataArray[3], 10) -
                    parseInt(dataArray[timeLine], 10));

            if (isFinite(changes * 100)) {
                setTrend(changes * 100);
            } else {
                setTrend(0);
            }

            if (changes >= 0) {
                className = className + "positive";
            } else {
                className = className + "negative";
            }

            setTrendClass(className);
        }

        if (dataArray.length > 0) {
            calculateAndSetTrend();
        }
    }, [timeLine]);

    if (dataArray.length === 0) {
        return <div className="waitingForConnection">Loading...</div>;
    } else {
        return (
            <section className="wrapper">
                <div className="header">
                    <div className="data_title">{title}</div>
                    <div className="trend_wrapper">
                        <Image
                            src={
                                trend >= 0
                                    ? `/static/images/trending-up.png`
                                    : `/static/images/trending-downWithoutBorder.png`
                            }
                            alt="trending"
                            width="62"
                            height="55"
                        />
                    </div>
                </div>
                <div className="body">
                    {/* <div className = "body_data">{dataArray[timeLine]}</div> */}
                    <div className="body_data">{dataArray[timeLine]}</div>
                    <div className="body_changeOverTime">
                        <div className={trendClass}>+{trend.toFixed(2)}%</div>
                    </div>
                </div>
                <div className="footer">
                    <div className="buttons">
                        {buttons.map((buttonTimeLine, index) => {
                            return (
                                <button
                                    className="footer_button"
                                    key={index}
                                    onClick={() => {
                                        setTimeLine(index);
                                        // let dataFetchURL : string = "/api/gotchiverse/stats";
                                        // if (index == 0) {
                                        //     dataFetchURL = dataFetchURL + "/30";
                                        // } else if (index == 1) {
                                        //     dataFetchURL = dataFetchURL + "/7";
                                        // } else if (index === 2) {
                                        //     dataFetchURL = dataFetchURL + "/1";
                                        // }

                                        // let gotchiverseResponse = useSWR(dataFetchURL, Fetcher);

                                        // if (gotchiverseResponse.data) {
                                        //     setDisplayData(parseInt(gotchiverseResponse.data[dataField]));
                                        // }
                                    }}
                                    disabled={timeLine === index}
                                >
                                    {index === 3
                                        ? "total"
                                        : index === 0
                                        ? `${buttonTimeLine} h`
                                        : `${buttonTimeLine} d`}
                                </button>
                            );
                        })}

                        {/* <button className = "footer_button" onClick = {() => {
                            setTimeLine(0);
                        }}
                        disabled = {timeLine === 0}
                        >30 d</button>
                        <button className = "footer_button" onClick ={ () => {
                            setTimeLine(1);
                        }}
                        disabled = {timeLine === 1}
                        >7 d</button>
                        <button className = "footer_button" onClick = { () => {
                            setTimeLine(2);
                        }}
                        disabled = {timeLine === 2}
                        >24 h </button>
                        <button className = "footer_button" onClick = { () => {
                            setTimeLine(3);
                        }}
                        disabled = {timeLine === 3}
                        >total</button> */}
                    </div>
                </div>

                <style jsx>
                    {`
                        .wrapper {
                            color: black;
                            border: 1px solid #000000;
                            background: white;
                            height: 278px;
                            width: 100%;
                            position: relative;
                            overflow: hidden;
                            display: flex;
                            flex-direction: column;
                        }

                        .header {
                            display: flex;
                            height: 100px;

                            margin-bottom: 10px;
                        }

                        .data_title {
                            font-size: 29px;
                            font-weight: 800;
                            line-height: 100%;
                            flex: 1.2;
                            line-height: 100%;
                            padding-left: 20px;
                            padding-top: 30px;

                            text-align: center;
                        }

                        .trend_wrapper {
                            flex: 1;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .body {
                            display: flex;
                        }

                        .body_data {
                            flex: 1;

                            text-align: center;
                            font-size: 45px;
                            font-weight: 800;
                        }

                        .body_changeOverTime {
                            flex: 1;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .body_trend_positive {
                            width: 108px;
                            height: 36px;
                            background-color: #51ffa8;
                            text-align: center;
                            font-size: 25px;
                        }

                        .body_trend_negative {
                            width: 108px;
                            height: 36px;
                            background-color: #ffc36b;
                            text-align: center;
                            font-size: 25px;
                        }

                        .footer {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex: 1;
                        }

                        .buttons {
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            width: 80%;
                        }

                        .footer_button {
                            box-sizing: border-box;

                            height: 40px;
                            flex: 1;
                            margin: 5px;
                            background: #b8b8b8;
                            border: 1px solid #666666;
                            background: transparent;
                            text-align: center;
                            color: #666666;
                            font-size: 22px;
                            font-weight: 800;
                            line-height: 20.44px;

                            transition: 0.5s;
                            padding: 2px;
                        }

                        .footer_button:disabled {
                            border: 1px solid #fa34f3;
                            color: #fa34f3;
                            pointer-events: none;
                        }
                    `}
                </style>
            </section>
        );
    }
}

export default DataCard;
