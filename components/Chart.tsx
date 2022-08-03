import React from "react";
import { useState, useEffect } from "react";
import findTitle from "./helperFunctions/titleSetHelper";
import "chart.js/auto";
import createDates from "./helperFunctions/dateCreater";
import { Line, Bar } from "react-chartjs-2";

interface ChartProps {
    title: string;
    data: string[];
}

interface graphData {
    labels: string[];
    datasets: data[];
}

interface data {
    label: string;
    data: string[];
    fill: boolean;
    borderColor: string;
    borderWidth: number;
    backgroundColor: string;
    tension: number;
}

export default function Chart({ title, data }: ChartProps) {
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
                borderWidth: 1,
                backgroundColor: "rgba(53, 162, 235, 0.4)",
                tension: 0.1,
            },
        ],
    });

    const [weeklyDates, monthlyDates] = createDates();

    useEffect(() => {
        function createData() {
            setChartData({
                labels: data.length !== 7 ? monthlyDates : weeklyDates,
                datasets: [
                    {
                        label: title,
                        data: data,
                        fill: false,
                        borderColor: "#FA34F3",
                        borderWidth: 1,
                        backgroundColor: "#FA34F3",
                        tension: 0.1,
                    },
                ],
            });
            setChartOptions({
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                    title: {
                        display: true,
                        text: title,
                    },
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
            });
        }

        createData();
    }, [data]);

    if (!data) {
        return <div>Loading....</div>;
    }

    return (
        <div>
            <div>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}
