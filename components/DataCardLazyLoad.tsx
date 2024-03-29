

import React from "react";
import {useState, useEffect} from "react";
import Image from "next/image";
import useSWR from "swr";
import Fetcher from "../fetcher";


interface DataCardProps {
    title: string;
    dataField: string;

};

const buttons : number[] = [30, 7, 24, 100];

function DataCardLazyLoad({ title, dataField }: DataCardProps) {



    const [timeLine, setTimeLine] = useState<number>(3);
    const [displayData, setDisplayData] = useState<number>(0);
    const [trend, setTrend] = useState<number>(0);
    const [trendClass, setTrendClass] = useState<string>("body_trend_positive");

    let dataArray: string[] = [];
    let dataDisplayed : string = "";

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

    let gotchivereStatsResponse = useSWR(
        "/api/gotchiverse/stats", 
        Fetcher
    );

    if (gotchivereStatsResponse.data && gotchiverseStats30dResponse.data && gotchiverseStats1dResponse.data && gotchiverseStats7dResponse.data) {
        console.log(gotchivereStatsResponse.data, "collected");
        dataArray = [gotchiverseStats1dResponse.data[dataField], gotchiverseStats7dResponse.data[dataField], gotchiverseStats30dResponse.data[dataField], gotchivereStatsResponse.data[dataField]];
        dataArray.forEach((element, index) => {
            dataArray[index] = element.toString();
        })
    };

    
    // const retrieveDataTotal = () => {

    //     let gotchivereStatsResponse = useSWR(
    //         "/api/gotchiverse/stats", 
    //         Fetcher
    //     );

    //     if (gotchivereStatsResponse.data) {
            
    //         dataArray[3] = gotchivereStatsResponse.data[dataField];
    //         console.log(dataArray, "total");
    //     }

    // }

    // const retrieveData30 = () => {
    //     let gotchivereStatsResponse30 = useSWR(
    //         "/api/gotchiverse/stats/30", 
    //         Fetcher
    //     );

    //     if (gotchivereStatsResponse30.data) {
            
    //         dataArray[2] = gotchivereStatsResponse30.data[dataField];
    //         console.log(dataArray, "30", gotchivereStatsResponse30.data[dataField]);
    //     }

    // }

    // const retrieveData7 = () => {
    //     let gotchivereStatsResponse7 = useSWR(
    //         "/api/gotchiverse/stats/7", 
    //         Fetcher
    //     );

    //     if (gotchivereStatsResponse7.data) {
            
    //         dataArray[1] = gotchivereStatsResponse7.data[dataField];
    //         console.log(dataArray, "7", gotchivereStatsResponse7.data[dataField]);
    //     }

    // }

    // const retrieveData1 = () => {
    //     let gotchivereStatsResponse1 = useSWR(
    //         "/api/gotchiverse/stats/1", 
    //         Fetcher
    //     );

    //     if (gotchivereStatsResponse1.data) {
            
    //         dataArray[0] = gotchivereStatsResponse1.data[dataField];
    //         console.log(dataArray, "1", gotchivereStatsResponse1.data[dataField]);
    //     }
    // }

    // retrieveDataTotal();
    // retrieveData30();
    // retrieveData7();
    // retrieveData1();
    


    useEffect(() => {

        // function fetchData() {
        //     let dataFetchURL : string = "/api/gotchiverse/stats";
        //     if (timeLine === 0) { 
        //         dataFetchURL = dataFetchURL + "/30";
        //     } else if (timeLine === 1) {
        //         dataFetchURL = dataFetchURL + "/7";
        //     } else if (timeLine === 2) {
        //         dataFetchURL = dataFetchURL + "/1";
        //     }

        //     let gotchiverseResponse = useSWR(dataFetchURL, Fetcher);

        //     if (gotchiverseResponse.data) {
        //         dataDisplayed = gotchiverseResponse.data[dataField];
        //     }
        // }

        

        function calculateAndSetTrend() {
            let className : string = "body_trend_";
            // const amountTotal : number = parseInt(dataArray[3], 10);
            // now - the amount at that time period ago 
            let changes : number = 0 ;
            if (dataArray.length === 4) {
                changes = (parseInt(dataArray[3], 10) - parseInt(dataArray[timeLine], 10)) / parseInt(dataArray[timeLine], 10);
            }
            setTrend(changes * 100);
            if (changes >= 0) {
                className = className + "positive";
            } else {
                className = className + "negative";
            };

            setTrendClass(className);

        }

        if (dataArray.length > 0) {
            calculateAndSetTrend();

        }


    }, [timeLine]);



    if (dataArray.length === 0) {
        return (
            <div className = "waitingForConnection">
                Loading...
            </div>
        )
    } else {
        return (
            <section className = "wrapper">
                <div className = "header">
                    <div className = "data_title">{title}</div>
                    <div className = "trend_wrapper">
                    <Image
                    src={ trend >= 0 ? `/static/images/trending-up.png` :`/static/images/trending-downWithoutBorder.png`}
                    alt="trending"
                    width="62"
                    height="55"
                    />
                    </div>
                </div>
                <div className = "body">
                    {/* <div className = "body_data">{dataArray[timeLine]}</div> */}
                    <div className = "body_data">{dataArray[timeLine]}</div>
                    <div className = "body_changeOverTime">
                        <div className = {trendClass}>
                            +{trend.toFixed(2)}%
                        </div>
                    </div>

                </div>
                <div className = "footer">
                    <div className = "buttons">
                        {
                            buttons.map((buttonTimeLine , index) => {
                                


                                return (
                                    <button className = "footer_button" 
                                    key = {index}
                                    onClick = {() => {
                                        setTimeLine(index);



                                    }}
                                    disabled = {timeLine === index}
                                    >
                                    {
                                        index === 3 ? "total" : 
                                        index === 2? `${buttonTimeLine} h` :
                                        `${buttonTimeLine} d`
                                    }
                                    </button>
                                )
                            })

                        }

                    
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
                        background-color: #51FFA8;
                        text-align: center;
                        font-size: 25px;
                    }

                    .body_trend_negative {
                        width: 108px;
                        height: 36px;
                        background-color: #FFC36B;
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
                        background: #B8B8B8;
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
                        border: 1px solid #FA34F3;
                        color: #FA34F3;
                        pointer-events: none;

                    }


                    `}
                </style>
            </section>
        )
    }

};


export default DataCardLazyLoad;