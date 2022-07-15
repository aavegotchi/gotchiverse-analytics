import { useState, useEffect } from "react";
import findTitle from "./helperFunctions/titleSetHelper";
import "chart.js/auto";
import createDates from "./helperFunctions/dateCreater";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import { create } from "domain";

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

interface dataObject {
    block: number;
    data: specificData;
}

interface specificData {
    installationsMintedTotal: string;
}
// interface ChartTestProps {
//     title: string;
//     data7d: dataObject[];
//     data30d: dataObject[];
// }

// interface data {
//     block: number;
//     data: objectData;
// }

// interface objectData {
//     installationsMintedTotal: string;

// }

interface GotchiverseStats {
    countChannelAlchemicaEvents: string;
    countParcelInstallations: string;
    countInstallationTypes: string;
    countUpgradesInitiated: string;
    alchemicaSpendOnInstallations: string[];
    alchemicaSpendOnUpgrades: string[];
    alchemicaSpendOnTiles: string[];
    alchemicaSpendTotal: string[];
    alchemicaChanneledTotal: string[];
    alchemicaClaimedTotal: string[];
    alchemicaExitedTotal: string[];
    tilesMinted: string;
    installationsMintedTotal: string;
    installationsUpgradedTotal: string;
    gltrSpendTotal: string;
    gltrSpendOnCrafts: string;
    gltrSpendOnUpgrades: string;
}

interface GotchiverseStatsTimeSeries {
    block: number;
    data: GotchiverseStats;
}

interface ChartTestProps {
    title: string;
    data: GotchiverseStatsTimeSeries[];
    fetchData: (interval: number) => void;
}

function ChartTest(props: ChartTestProps): JSX.Element {
    const { title, data } = props;

    const [titleName, setTitleName] = useState<string>("");
    const [chartData, setChartData] = useState<object>({
        datasets: [{}],
    });

    const [display7d, setDisplay7d] = useState<boolean>(true);

    const featuresArray = ["installationsMintedTotal"];

    console.log(featuresArray, "array here");
    // setting up weekly data here
    // setting up monthly data here

    //================ installations minted ================================
    const [installationsMintedTotalWeek, setInstallationsMintedWeekTotal] =
        useState<string[]>([]);
    const [installationsMintedTotalMonth, setInstallationsMintedMonthTotal] =
        useState<string[]>([]);

    //================ tiles minted =========================================
    const [tilesMintedTotalWeek, setTilesMintedWeekTotal] = useState<string[]>(
        []
    );
    const [tilesMintedTotalMonth, setTilesMintedMonthTotal] = useState<
        string[]
    >([]);

    const [chartOptions, setChartOptions] = useState<object>({});

    const [weeklyDates, setWeeklyDates] = useState<string[]>([]);
    const [monthlyDates, setMonthlyDates] = useState<string[]>([]);

    useEffect(() => {
        setTitleName(findTitle(title));
        const [weeklyResponse, monthlyResponse] = createDates();
        setWeeklyDates(weeklyResponse);
        setMonthlyDates(monthlyResponse);
    }, []);

    useEffect(() => {
        function createDataObject() {
            let arrayInstallationsMintedWeekly = new Array(7).fill("");
            let arrayInstallationsMintedMonthly = new Array(30).fill("");

            data7d.map((data, index) => {
                arrayInstallationsMintedWeekly[index] =
                    data.data["installationsMintedTotal"];
            });

            data30d.map((data, index) => {
                arrayInstallationsMintedMonthly[index] =
                    data.data["installationsMintedTotal"];
            });

            setInstallationsMintedMonthTotal(arrayInstallationsMintedMonthly);
            setInstallationsMintedWeekTotal(arrayInstallationsMintedWeekly);
        }
        createDataObject();
        console.log("YAY", installationsMintedTotalWeek);
    }, [data7d, data30d]);

    useEffect(() => {
        setChartData({
            labels: weeklyDates,
            datasets: [
                {
                    label: "change to line bar later ",
                    data: installationsMintedTotalWeek,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(53, 162, 235, 0.4)",
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
                    text: titleName,
                },
            },
        });
    }, [weeklyDates, monthlyDates]);

    useEffect(() => {
        if (display7d === true) {
            setChartData({
                labels: weeklyDates,
                datasets: [
                    {
                        label: "change to line bar later ",
                        data: installationsMintedTotalWeek,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "rgba(53, 162, 235, 0.4)",
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
                        text: titleName,
                    },
                },
            });
        } else {
            setChartData({
                labels: monthlyDates,
                datasets: [
                    {
                        label: "change to line bar later ",
                        data: installationsMintedTotalMonth,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "rgba(53, 162, 235, 0.4)",
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
                        text: titleName,
                    },
                },
            });
        }
    }, [display7d]);

    return (
        <>
            <div className="wrapper">
                <Line data={chartData} options={chartOptions} />
                <div className="buttonWrapper">
                    <div className="buttons">
                        <button
                            className="button"
                            disabled={display7d === true}
                            onClick={() => {
                                setDisplay7d(true);
                            }}
                        >
                            7 d
                        </button>
                        <button
                            className="button"
                            disabled={display7d === false}
                            onClick={() => {
                                setDisplay7d(false);
                            }}
                        >
                            30 d
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .wrapper {
                        color: #04b6bc;
                        width: 100%;
                        height: 100%;
                        background: white;
                        border: 1.40288px solid #000000;
                        padding: 5px;
                    }

                    .buttons {
                        display: flex;
                        justify-content: right;
                        margin-right: 20px;
                    }
                    .button {
                        box-sizing: border-box;
                        width: 65px;
                        height: 45px;

                        margin: 5px;
                        background: #b8b8b8;
                        border: 1px solid #111111;
                        box-shadow: 4px 4px 0px #000000;
                        text-align: center;
                        color: black;
                        font-size: 22px;
                        line-height: 20.44px;
                        font-weight: 400;
                        transition: 0.5s;
                        padding: 2px;
                    }
                    .button:disabled {
                        background-color: #cf15f9;
                        pointer-events: none;
                        color: white;
                    }

                    .button:hover {
                        background: #04b6bc;
                        color: #6d18f8;
                        transition: 0.2s ease-in-out;
                    }
                `}
            </style>
        </>
    );
}

export default ChartTest;
