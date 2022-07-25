import Image from "next/image";
import React from "react";
import { useState, useEffect} from "react";
import useSWR from "swr";
import Fetcher from "../fetcher";



interface SmallDataCardProps {
    title: string;
    dataField: string;
}

function SmallDataCard({title, dataField} : SmallDataCardProps) {

    const [trend , setTrend] = useState(0);

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

    let gotchivereStatsResponse = useSWR(
        "/api/gotchiverse/stats", 
        Fetcher
    );


    if (gotchivereStatsResponse.data && gotchiverseStatsResponse30.data && gotchiverseStatsResponse1.data && gotchiverseStatsResponse7.data) {
        dataArray = [gotchiverseStatsResponse1.data[dataField], gotchiverseStatsResponse7.data.data[dataField], gotchiverseStatsResponse30.data[dataField], gotchivereStatsResponse.data[dataField]];
        dataArray.forEach((element, index) => {
            dataArray[index] = element.toString();
        })
    }

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
            </div>

            <style jsx>
                {`

                .wrapper {
                    border: 1px solid black;
                }

                .title {
                    display: flex;
                    justify-content: space-around;

                }

                
                `}
            </style>
        </section>
    )

};


export default SmallDataCard;

