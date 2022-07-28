import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
} from "chart.js";
import { useEffect, useState } from "react";
import { ChartProps, Pie } from "react-chartjs-2";

export interface AavegotchiPieChartProps {
    label: string;
    labels: string[];
    values: number[];
}
export function AavegotchiPieChart({
    label,
    labels,
    values,
}: AavegotchiPieChartProps) {
    const [data, setData] = useState(mapData(label, labels, values));
    // update Data

    function mapData(label: string, labels: string[], values: number[]) {
        let datasetTemplate = {
            label: label,
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
        };
        let dataTemlate = {
            labels: labels,
            datasets: [datasetTemplate],
        };

        return dataTemlate;
    }

    useEffect(() => {
        if (labels && values && label) {
            setData(mapData(label, labels, values));
        }
    }, [labels, values, label]);

    return <Pie data={data} />;
}
