import React from "react";
import {useState, useEffect} from "react";
import Image from "next/image";
import useSWR from "swr";
import Fetcher from "../fetcher";


interface DataCardProps {
    title: string;
    dataField: string;

}

function DataCard({ title, dataField }: DataCardProps) {

    const [timeLine, setTimeLine] = useState<number>(3);
    const [trend, setTrend] = useState<number>(0);





    let dataArray: string[] = [];

    const retrieveData = () => {
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

        }

    }

    retrieveData();



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
                    src={`/static/images/trending-up.png`}
                    alt="trending"
                    width="62"
                    height="55"
                    />
                    </div>
                </div>
                <div className = "body">
                    <div className = "body_data">{dataArray[timeLine]}</div>
                    <div className = "body_changeOverTime">
                        <div className = "body_trend">
                            +{trend}%
                        </div>
                    </div>

                </div>
                <div className = "footer">
                    <div className = "buttons">

                    
                        <button className = "footer_button" onClick = {() => {
                            setTimeLine(0);
                        }}
                        disabled = {timeLine === 0}
                        >24 h</button>
                        <button className = "footer_button" onClick ={ () => {
                            setTimeLine(1);
                        }}
                        disabled = {timeLine === 1}
                        >7 d</button>
                        <button className = "footer_button" onClick = { () => {
                            setTimeLine(2);
                        }}
                        disabled = {timeLine === 2}
                        >30 d </button>
                        <button className = "footer_button" onClick = { () => {
                            setTimeLine(3);
                        }}
                        disabled = {timeLine === 3}
                        >total</button>
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

                    .body_trend {
                        width: 108px;
                        height: 36px;
                        background-color: #51FFA8;
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


export default DataCard;