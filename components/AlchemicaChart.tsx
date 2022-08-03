import React from "react";
import { useState, useEffect } from "react";
import findTitle from "./helperFunctions/titleSetHelper";
import "chart.js/auto";
import createDates from "./helperFunctions/dateCreater";
import { Line, Bar } from "react-chartjs-2";
import { BigNumber } from "ethers";

interface ChartProps {
    mintedAlchemica: number[];
    totalSupplyAlchemica: number[];
}

interface graphData {
    labels: string[];
    datasets: data[];
}

interface data {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    backgroundColor: string;
    tension: number;
}

export default function AlchemicaChart({
    mintedAlchemica,
    totalSupplyAlchemica,
}: ChartProps) {
    const [chartOptions, setChartOptions] = useState<object>({
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "",
            },
        },
    });
    const [chartData, setChartData] = useState<graphData>({
        labels: [],
        datasets: [
            {
                label: "change to line bar later ",
                data: [],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(53, 162, 235, 0.4)",
                tension: 0.1,
            },
        ],
    });

    const [weeklyDates, monthlyDates] = createDates();

    const logNumbers = (num: number[]) => {
        const data = [];

        for (let i = 0; i < num.length; ++i) {
            data.push(Math.log10(num[i]));
        }

        return data;
    };

    console.log(mintedAlchemica, "here minted");
    console.log(totalSupplyAlchemica, "here total");

    useEffect(() => {
        function createData() {
            setChartData({
                labels: ["FUD", "FOMO", "ALPHA", "KEK"],
                datasets: [
                    {
                        label: "Total Alchemica Minted",
                        data: mintedAlchemica,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "#622FEE",
                        tension: 0.1,
                    },
                    {
                        label: "Total Supply Of Alchemica",
                        data: totalSupplyAlchemica,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "#FA34F3",
                        tension: 0.1,
                    },
                ],
            });
            setChartOptions({
                layout: {
                    padding: 5,
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },

                    y: {
                        grid: {
                            borderDash: [2, 2],
                        },
                    },
                },
                barPercentage: 0.5,
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                        data: {
                            font: {
                                size: 15,
                                weight: 800,
                            },
                        },
                        labels: {
                            boxHeight: 15,
                        },
                    },
                    title: {
                        display: true,
                        text: "",
                    },
                },
                maintainAspectRatio: true,
            });
        }

        createData();
    }, []);

    return (
        <section>
            <div className="chart_wrapper">
                <Bar data={chartData} options={chartOptions} />
            </div>
            <style jsx>
                {`
                    .chart_wrapper {
                        width: 95%;
                        margin: 0 auto;
                        position: absolute;
                        top: 50px;
                    }
                `}
            </style>
        </section>
    );
}
