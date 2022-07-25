import React from "react";

interface ChartTestProps {
    title: string;
    data: string[];
}
export default function ChartTest({ title, data }: ChartTestProps) {
    return (
        <div>
            <div>{title}</div>
            <div>
                {data.map((e, index) => (
                    <div key = {index}>{e}</div>
                ))}
            </div>
        </div>
    );
}