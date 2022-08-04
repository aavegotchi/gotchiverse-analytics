import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import TimeLineButtons from "./Time_Line_Buttons/TimeLineButtons";

interface SmallDataCardEditedV2Props {
    title: string;
    data: number[];
}

function SmallDataCardEditedV2({ title, data }: SmallDataCardEditedV2Props) {
    const [trend, setTrend] = useState<number>(0);
    const [timeLine, setTimeLine] = useState<number>(3);
    const [trendClass, setTrendClass] = useState<string>("body_trend_positive");

    useEffect(() => {
        function calculateAndSetTrend() {
            let className: string = "body_trend_";
            const changes: number =
                (data[timeLine] / (data[3] - data[timeLine])) * 100;

            if (isFinite(changes)) {
                setTrend(parseFloat(changes.toFixed(2)));
            } else {
                setTrend(0);
            }

            if (changes >= 0) {
                className = className + "positive";
            } else {
                className = className + "negative";
            }

            setTrendClass(className);
        }

        if (data) {
            calculateAndSetTrend();
        }
    }, [timeLine]);

    return (
        <section>
            <div className="wrapper">
                <div className="title">
                    <div className="title_name">{title}</div>
                    {/* <div className="question">?</div> */}
                </div>
                <div className="body">
                    <div className="body_data">{data && data[timeLine]}</div>
                    <div className="body_trend_changes">
                        <div className={trendClass}>{trend}%</div>
                        <div className="title_trend">
                            <Image
                                src={
                                    trend >= 0
                                        ? `/static/images/trending-up.png`
                                        : `/static/images/trending-downWithoutBorder.png`
                                }
                                alt="trending"
                                width="50"
                                height="50"
                            />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <TimeLineButtons
                        timeLine={timeLine}
                        setTimeLine={setTimeLine}
                    />
                </div>
            </div>

            <style jsx>
                {`
                    .wrapper {
                        border: 1px solid black;
                        height: 300px;
                        background: white;
                    }

                    .title {
                        display: flex;
                        justify-content: space-around;
                        padding-top: 15px;
                        padding-left: 10px;
                    }

                    .title_name {
                        font-size: 31px;
                        font-weight: 800;
                        padding-left: 15px;
                        line-height: 100%;
                        padding-right: 60px;
                    }

                    .title_trend {
                        padding-right: 30px;
                    }

                    .question {
                        margin-right: 20px;
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: transparent;
                        border: 1px solid grey;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: grey;
                        font-size: 20px;
                        font-weight: 800;
                        cursor: pointer;
                    }

                    .body {
                        padding-top: 10px;
                        display: flex;
                        flex-direction: column;
                        padding-left: 25px;
                    }

                    .body_data {
                        font-size: 50px;
                        font-weight: 800;
                        vertical-align: top;
                        line-height: 100%;
                        margin-bottom: 15px;
                    }

                    .body_trend_positive {
                        width: 108px;
                        height: 36px;
                        background-color: #51ffa8;
                        text-align: center;
                        font-size: 25px;
                    }

                    .body_trend_negative {
                        width: 108px;
                        height: 36px;
                        background-color: #ffc36b;
                        text-align: center;
                        font-size: 25px;
                    }

                    .body_trend_changes {
                        display: flex;
                        justify-content: space-between;
                    }

                    .under_construction {
                        font-size: 50px;
                        font-weight: 800;
                        line-height: 100%;
                        margin-bottom: 15px;
                        color: grey;
                        cursor: pointer;
                    }

                    .trend_data {
                        width: 108px;
                        height: 36px;
                        background-color: #51ffa8;
                        text-align: center;
                        font-size: 18px;
                        font-weight: 800;
                        color: grey;
                        padding: 2px;
                        cursor: pointer;
                    }

                    .footer {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 20px;
                        padding: 0;
                    }
                `}
            </style>
        </section>
    );
}

export default SmallDataCardEditedV2;
