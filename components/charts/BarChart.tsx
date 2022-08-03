import React from "react";
import { useState, useEffect } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

interface ChartProps {
    labels: string[];
    dataSets: data[];
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

export default function AlchemicaChart({ labels, dataSets }: ChartProps) {
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
                label: "Loading...",
                data: [],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(53, 162, 235, 0.4)",
                tension: 0.1,
            },
        ],
    });

    useEffect(() => {
        function createData() {
            setChartData({
                labels: labels,
                datasets: dataSets,
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
    }, [labels, dataSets]);

    return (
        <section>
            <div className="chart_wrapper">
                {dataSets && labels && (
                    <Bar data={chartData} options={chartOptions} />
                )}
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
