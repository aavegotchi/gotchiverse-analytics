import { useState } from "react";
import useSWR from "swr";
import Fetcher from "../fetcher";
import Chart from "./Chart";

export interface GotchiverseStatsChart {
    title: string;
    field: string;
}
export default function GotchiverseStatsChart({
    field,
    title,
}: GotchiverseStatsChart) {
    const [interval, setInterval] = useState(7);
    let data: string[] = [];

    let gotchiverseStats7dResponse = useSWR(
        `/api/gotchiverse/stats/${interval}/series`,
        Fetcher
    );

    if (gotchiverseStats7dResponse.data) {
        data = gotchiverseStats7dResponse.data.map((e: any) => {
            return e.data[field];
        });
    }

    // const showInterval = () => {
    //     let gotchiverseStats7dResponse = useSWR(
    //         `/api/gotchiverse/stats/${interval}/series`,
    //         Fetcher
    //     );

    //     if (gotchiverseStats7dResponse.data) {
    //         data = gotchiverseStats7dResponse.data.map((e: any) => {
    //             return e.data[field];
    //         });
    //     }
    // };

    // showInterval();

    return (
        <div className="wrapper">
            <Chart title={title} data={data} />
            <div>
                <button className="button" onClick={() => setInterval(7)}>
                    Show 7D
                </button>
                <button className="button" onClick={() => setInterval(30)}>
                    Show 30D
                </button>
            </div>
            <style jsx>
                {`
                    .wrapper {
                        color: #04b6bc;
                        width: 100%;
                        height: 100%;
                        background: white;
                        border: 1.40288px solid #000000;
                        padding: 5px;
                    }

                    .buttons {
                        display: flex;
                        justify-content: right;
                        margin-right: 20px;
                    }
                    .button {
                        box-sizing: border-box;
                        width: 100px;
                        height: 45px;

                        margin: 5px;
                        background: #b8b8b8;
                        border: 1px solid #111111;
                        box-shadow: 4px 4px 0px #000000;
                        text-align: center;
                        color: black;
                        font-size: 22px;
                        line-height: 20.44px;
                        font-weight: 400;
                        transition: 0.5s;
                        padding: 2px;
                    }
                    .button:disabled {
                        background-color: #cf15f9;
                        pointer-events: none;
                        color: white;
                    }

                    .button:hover {
                        background: #04b6bc;
                        color: #6d18f8;
                        transition: 0.2s ease-in-out;
                    }
                `}
            </style>
        </div>
    );
}
