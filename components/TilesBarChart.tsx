import { Row, Col } from "react-bootstrap";
import BarChart from "./charts/BarChart";
import { useState, useEffect } from "react";

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
            data: [],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "#622FEE",
            tension: 0.1,
        },
    ]);
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [savedDataArray, setSavedDataArray] = useState<dataObject[]>();

    const [barGraphOptions, setBarGraphOptions] = useState({
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
            },
        },
        indexAxis: "y",
    });

    useEffect(() => {
        setSavedDataArray(
            dataArray.sort((a, b) => {
                return a.amount - b.amount;
            })
        );
    }, [dataArray]);

    return (
        <>
            <div className="barChartWrapper">
                {savedDataArray && (
                    <BarChart
                        labels={savedDataArray.map((dataObject, index) => {
                            return dataObject.name;
                        })}
                        dataSets={[
                            {
                                label: "Total Alchemica Minted",
                                data: savedDataArray.map(
                                    (dataObject, index) => {
                                        return dataObject.amount;
                                    }
                                ),
                                fill: false,
                                borderColor: "rgb(75, 192, 192)",
                                backgroundColor: "#622FEE",
                                tension: 0.1,
                            },
                        ]}
                        customChartOptions={barGraphOptions}
                    />
                )}
                <div
                    className="toggle_button"
                    onClick={() => {
                        if (isAscending === true) {
                            setIsAscending(false);
                            setSavedDataArray(
                                dataArray.sort((a, b) => {
                                    return b.amount - a.amount;
                                })
                            );
                        } else {
                            setIsAscending(true);
                            setSavedDataArray(
                                dataArray.sort((a, b) => {
                                    return a.amount - b.amount;
                                })
                            );
                        }
                    }}
                >
                    Toggle
                </div>
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

                    .toggle_button {
                        border: 1px solid black;
                        width: 100px;
                        height: 40px;
                        display: flex;
                        font-size: 20px;
                        justify-content: center;
                        align-items: center;
                        background-color: #301b69;
                        color: white;
                        cursor: pointer;
                        position: absolute;
                        right: 10%;
                        top: 12%;
                        border-radius: 10px;
                        transition: 0.5s ease-in-out;
                    }

                    .toggle_button:hover {
                        background: white;
                        color: #301b69;
                    }
                `}
            </style>
        </>
    );
}
