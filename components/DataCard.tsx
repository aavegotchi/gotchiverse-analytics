import React from "react";
import {useState, useEffect} from "react";


interface DataCardProps {
    title: string;
    data: string;
    data1d: string[];
    data7d: string[];
    data30d: string[];

}




function DataCard({ title, data, data1d, data7d, data30d}: DataCardProps) {


    const [timeLine, setTimeLine] = useState<number>(100);



    if (!data ) {
        return (
            <div className = "waitingForConnection">
                Loading...
            </div>
        )
    } else {
        return (
            <div>
                {data}
            </div>
        )
    }

};


export default DataCard;