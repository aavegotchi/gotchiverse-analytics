import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

interface GrassRugDataCardProps {
    title: string;
    data: string;
}

const buttons: number[] = [30, 7, 24, 100];

function GrassRugDataCard({ title, data }: GrassRugDataCardProps) {
    const [trend, setTrend] = useState<number>(0);

    const [timeLine, setTimeLine] = useState(3);
    return (
        <section>
            <div className="wrapper">
                <div className="title">
                    <div className="title_name">{title}</div>
                    <div className="title_trend">
                        <Image
                            src={
                                trend >= 0
                                    ? `/static/images/trending-up.png`
                                    : `/static/images/trending-downWithoutBorder.png`
                            }
                            alt="trending"
                            width="62"
                            height="55"
                        />
                    </div>
                </div>
                <div className="body">
                    <div className="body_data">{data ? data : "Loading"}</div>
                    <Tippy content="Under construction">
                        <div className="trend_data">--%</div>
                    </Tippy>
                </div>
                <div className="footer">
                    <div className="buttons">
                        {buttons.map((buttonTimeLine, index) => {
                            return (
                                <Tippy content="Unavailable" key={index}>
                                    <button
                                        className="footer_button"
                                        disabled={timeLine === index}
                                    >
                                        {index === 3
                                            ? "total"
                                            : index === 2
                                            ? `${buttonTimeLine} h`
                                            : `${buttonTimeLine} d`}
                                    </button>
                                </Tippy>
                            );
                        })}
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .wrapper {
                        border: 1px solid black;
                        width: 100%;
                        height: 300px;
                    }

                    .title {
                        display: flex;
                        justify-content: space-around;
                        padding-top: 15px;
                        padding-left: 10px;
                    }

                    .title_name {
                        font-size: 32px;
                        font-weight: 800;
                        padding-left: 15px;
                        line-height: 100%;
                    }

                    .title_trend {
                        padding-top: 15px;
                        padding-right: 15px;
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
                        flex: 1;
                        margin-top: 20px;
                    }

                    .buttons {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        width: 90%;
                    }

                    .footer_button {
                        box-sizing: border-box;

                        height: 40px;
                        flex: 1;
                        margin: 5px;
                        background: #b8b8b8;
                        border: 1px solid #666666;
                        background: transparent;
                        text-align: center;
                        color: #666666;
                        font-size: 22px;
                        font-weight: 800;
                        line-height: 20.44px;
                        width: 50px;
                        transition: 0.5s;
                        padding: 2px;
                    }

                    .footer_button:disabled {
                        border: 1px solid #fa34f3;
                        color: #fa34f3;
                        pointer-events: none;
                    }
                `}
            </style>
        </section>
    );
}

export default GrassRugDataCard;
