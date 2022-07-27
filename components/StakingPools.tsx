import React from "react";
import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function StakingPools() {
    return (
        <section>
            <div className="wrapper">
                <div className="bodyWrapper">
                    <div className="left">
                        <button className="button button_left">
                            <Image
                                src={`/static/images/chevron-left.png`}
                                alt="chevron"
                                width="50"
                                height="50"
                            />
                        </button>
                    </div>
                    <div className="center">
                        <div className="tileHeader">
                            <span className="tileHeader">GLTR STAKING</span>
                        </div>

                        <div className="dataContainerv2">
                            <div className="mainDatav2">
                                <div className="heading">
                                    <span className="heading_Name">
                                        TOTAL STAKED:
                                    </span>
                                </div>
                                <div className="tileTitle_wrapper">
                                    <span className="tileTitle">
                                        GLTR STAKING
                                    </span>
                                </div>
                            </div>
                            <div className="circularBarWrapperv2">
                                <CircularProgressbar
                                    value={65}
                                    text={"hello world"}
                                    styles={buildStyles({
                                        strokeLinecap: "flat",
                                        pathTransitionDuration: 0.5,
                                        textSize: "25px",
                                        textColor: "black",
                                        pathColor: "#622FEE",
                                        trailColor: "#858585",
                                        rotation: 0.25,
                                    })}
                                />
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div className="right">
                        <button className="button button_right">
                            <Image
                                src={`/static/images/chevron-right.png`}
                                alt="chevron"
                                width="50"
                                height="50"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>
                {`
                    .center {
                        height: 100%;
                        display: flex;
                        flex-direction: column;

                        flex: 4;
                    }

                    .heading {
                        margin-bottom: 15px;
                    }

                    .tileHeader {
                        font-size: 32px;
                        font-weight: 800;
                        font-style: normal;
                        text-transform: uppercase;
                    }

                    .left {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .right {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .bodyWrapper {
                        display: flex;

                        align-items: center;
                        justify-content: space-around;
                        height: 100%;
                        width: 100%;
                    }

                    .dataContainerv2 {
                        height: 100%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }

                    .heading_Name {
                        font-size: 22px;
                        line-height: 29px;
                        font-weight: 400;
                    }

                    .tileHeader {
                        text-align: center;
                    }

                    .mainDatav2 {
                        height: 100%;

                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        padding-bottom: 10px;
                    }

                    .circularBarWrapperv2 {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 150px;
                        height: 199px;
                    }
                    .wrapper {
                        display: flex;
                        color: black;
                        background: white;
                        width: 100%;
                        border: 1px solid black;
                    }

                    .circularBarWrapper {
                        width: 110px;
                        position: relative;
                        bottom: 10px;
                        left: 10px;

                        flex: 1;
                    }

                    .bodyItem {
                        flex: 1;
                        margin: 0px 20px;
                        padding: 30px;

                        cursor: pointer;
                    }
                    .tileTitle {
                        font-size: 22px;
                        font-weight: 400;
                        line-height: 29px;
                        text-align: center;
                    }

                    .dataContainer {
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                        text-align: center;
                        flex-direction: column;
                        width: 100%;
                    }

                    .dataWrapper {
                        width: 100px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        flex: 1;
                    }

                    .mainData {
                        font-size: 35px;
                        font-weight: 600;
                        padding: 10px;
                    }

                    .dataChanges {
                        display: flex;
                        align-items: center;
                        margin-left: 20px;
                    }

                    .negative {
                        color: #c23685;
                    }
                    .buttons {
                        display: flex;
                        justify-content: space-between;
                    }
                    .bottomLeft {
                        flex: 4;
                        display: flex;
                    }
                    .bottomRight {
                        flex: 4;
                    }

                    .button {
                        width: 70px;
                        margin: 2px;
                        background: transparent;
                        border: none;
                        text-align: center;
                        color: #04b6bc;
                        height: 50px;
                        padding: 5px;
                    }

                    .button_left:hover {
                        transform: translateX(10px);
                        transition: 0.2s ease-in-out;
                    }

                    .button_right:hover {
                        transform: translateX(-10px);
                        transition: 0.5s ease-in-out;
                    }

                    .graph {
                        margin-left: 20px;
                    }
                    .time {
                        width: 35px;
                    }
                `}
            </style>
        </section>
    );
}

export default StakingPools;
