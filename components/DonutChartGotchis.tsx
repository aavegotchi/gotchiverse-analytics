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
                <div>
                    <Doughnut
                        data={{
                            labels: label,
                            datasets: [
                                {
                                    label: " ",
                                    data: values,
                                    backgroundColor: [
                                        "rgba(255, 99, 132, 0.2)",
                                        "rgba(54, 162, 235, 0.2)",
                                        "rgba(255, 206, 86, 0.2)",
                                        "rgba(75, 192, 192, 0.2)",
                                        "rgba(153, 102, 255, 0.2)",
                                        "rgba(255, 159, 64, 0.2)",
                                    ],
                                    borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                        "rgba(75, 192, 192, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)",
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        height={500}
                        width={500}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: title,
                                    align: "center",
                                    padding: {
                                        top: 40,
                                        bottom: 40,
                                    },
                                    font: {
                                        size: 15,
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
            </div>
            <style jsx>
                {`
                    .wrapper {
                        border: 1px solid black;
                    }
                `}
            </style>
        </section>
    );
}

export default DonutChartGotchis;
