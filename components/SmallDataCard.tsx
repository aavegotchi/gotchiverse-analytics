import Image from "next/image";
import React from "react";
import { useState, useEffect} from "react";
import useSWR from "swr";
import Fetcher from "../fetcher";



interface SmallDataCardProps {
    title: string;
    dataField: string;
};

const buttons : number[] = [30, 7, 24, 100];

function SmallDataCard({title, dataField} : SmallDataCardProps) {

    const [trend , setTrend] = useState(0);
    const [timeLine, setTimeLine] = useState(3);

    let dataArray: string[] = [];

    let gotchiverseStatsResponse7 = useSWR(
        "/api/gotchis/stats/7",
        Fetcher
    );

    let gotchiverseStatsResponse1 = useSWR(
        "/api/gotchis/stats/1",
        Fetcher
    );

    let gotchiverseStatsResponse30 = useSWR(
        "/api/gotchis/stats/30",
        Fetcher
    );

    let gotchiverseStatsResponse = useSWR(
        "/api/gotchis/stats", 
        Fetcher
    );


    if (gotchiverseStatsResponse.data && gotchiverseStatsResponse30.data && gotchiverseStatsResponse1.data && gotchiverseStatsResponse7.data) {
        dataArray = [gotchiverseStatsResponse1.data[dataField], gotchiverseStatsResponse7.data.data[dataField], gotchiverseStatsResponse30.data[dataField], gotchivereStatsResponse.data[dataField]];
        dataArray.forEach((element, index) => {
            dataArray[index] = element.toString();
        })
    }
    console.log("here", dataArray, gotchiverseStatsResponse);

    return(

        <section>
            <div className = "wrapper">
                <div className = "title">
                    <div className = "title_name">
                        {title}

                    </div>
                    <div className = "title_trend">
                        <Image 
                        src={ trend >= 0 ? `/static/images/trending-up.png` :`/static/images/trending-downWithoutBorder.png`}
                        alt="trending"
                        width="62"
                        height="55"
                        />

                    </div>

                </div>
                <div className = "body">
                    {

                    }
                    <div className = {title === "GOTCHIS CHANNELED" ? "under_construction" : "body_data"}>
                        {

                            title === "GOTCHIS CHANNELED" ?  "000" : gotchiverseStatsResponse.data && gotchiverseStatsResponse.data[dataField]
                        }
                    </div>
                    <div className = "trend_data">
                        --%
                    </div>
                </div>
                <div className = "footer">
                    <div className = "buttons">
                        {
                            buttons.map((buttonTimeLine, index) => {


                                return (
                                    <button 
                                    className = "footer_button"
                                    key = {index}
                                    disabled = {timeLine === index}
                                    
                                    >
                                        {
                                            index === 3 ? "total":
                                            index === 2 ? `${buttonTimeLine} h` :
                                            `${buttonTimeLine} d`

                                        }

                                    </button>
                                )
                            })
                        }

                    </div>

                </div>
                
            </div>

            <style jsx>
                {`

                .wrapper {
                    border: 1px solid black;
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
                    background-color: #51FFA8;
                    text-align: center;
                    font-size: 18px;
                    font-weight: 800;
                    color: grey;
                    padding: 2px;
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
                    background: #B8B8B8;
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
                    border: 1px solid #FA34F3;
                    color: #FA34F3;
                    pointer-events: none;

                }



                
                `}
            </style>
        </section>
    )

};


export default SmallDataCard;

