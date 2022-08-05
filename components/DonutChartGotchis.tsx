import React from "react";
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { start } from "repl";

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);

// export const data = {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [
//         {
//             label: " ",
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 "rgba(255, 99, 132, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(255, 206, 86, 0.2)",
//                 "rgba(75, 192, 192, 0.2)",
//                 "rgba(153, 102, 255, 0.2)",
//                 "rgba(255, 159, 64, 0.2)",
//             ],
//             borderColor: [
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(54, 162, 235, 1)",
//                 "rgba(255, 206, 86, 1)",
//                 "rgba(75, 192, 192, 1)",
//                 "rgba(153, 102, 255, 1)",
//                 "rgba(255, 159, 64, 1)",
//             ],
//             borderWidth: 1,
//         },
//     ],
// };

interface DonutChartGotchisProps {
    title: string;
    label: string[];
    values: string[];
}

function DonutChartGotchis({ title, label, values }: DonutChartGotchisProps) {
    return (
        <section>
            <div className="wrapper">
                <div className="doughnut">
                    <Doughnut
                        data={{
                            labels: label,
                            datasets: [
                                {
                                    label: " ",
                                    data: values,
                                    backgroundColor: [
                                        "#FA34F3",
                                        "#622FEE",
                                        "#FFC36B",
                                    ],
                                    borderColor: [
                                        "#FA34F3",
                                        "#622FEE",
                                        "#FFC36B",
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        height={300}
                        width={300}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: "title here",
                                    align: "center",
                                    padding: {
                                        bottom: 40,
                                    },
                                    font: {
                                        size: 16,
                                        weight: "900",
                                    },
                                },
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                    />
                </div>
                <div>Some body</div>
            </div>
            <style jsx>
                {`
                    .wrapper {
                        border: 1px solid black;
                        display: flex;
                        flex-direction: column;

                        align-items: center;
                        position: relative;
                        height: 410px;
                    }

                    .doughnut {
                        padding-top: 0;
                        height: 300px;
                        width: 300px;
                    }
                `}
            </style>
        </section>
    );
}

export default DonutChartGotchis;
