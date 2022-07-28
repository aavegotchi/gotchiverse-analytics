interface DonutChartGotchisProps {
    Title: string;
    Label: string[];
    Values: number[];
}

function DonutChartGotchis({ Title, Label, Values }: DonutChartGotchisProps) {
    return (
        <section>
            <div className="wrapper">Hello world</div>
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
