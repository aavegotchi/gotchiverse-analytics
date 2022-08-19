import { Row, Col } from "react-bootstrap";
import BarChart from "./charts/BarChart";
import { useState, useEffect } from "react";
import { defaultDataIdFromObject } from "@apollo/client";

interface TilesBarChartProps {
    dataArray: dataObject[];
}

interface dataObject {
    name: string;
    amount: number;
    uri: string;
}

interface data {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    backgroundColor: string;
    tension: number;
}

export default function TilesBarChart({
    dataArray,
}: TilesBarChartProps): JSX.Element {
    const [barGraphData, setBarGraphData] = useState<data[]>([
        {
            label: "Total Alchemica Minted",
            data: dataArray
                .map((dataObject, index) => {
                    return dataObject.amount;
                })
                .sort((a, b) => {
                    return a - b;
                }),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "#622FEE",
            tension: 0.1,
        },
    ]);

    return (
        <>
            <div className="barChartWrapper">
                <BarChart
                    labels={dataArray.map((dataObject, index) => {
                        return dataObject.name;
                    })}
                    dataSets={barGraphData}
                />
            </div>
            <style jsx>
                {`
                    .barChartWrapper {
                        color: black;
                        border: 1px solid #000000;
                        background: white;
                        height: 600px;
                        width: 100%;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        position: relative;
                    }
                `}
            </style>
        </>
    );
}
