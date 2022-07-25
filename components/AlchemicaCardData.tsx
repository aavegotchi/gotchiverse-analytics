import useSWR from "swr";
import Fetcher from "../fetcher";
import Image from "next/image";
import SuffixShortener from "./helperFunctions/SuffixShortener";

interface AlchemicaCardProps {
    title: string;
    dataField: string;
}




const coins : string[] = [
    "FUD", "FOMO", "ALPHA", "KEK"
];


function AlchemicaCardData({title, dataField} : AlchemicaCardProps) {

    let data : string[] = [];

    // const fetchData = () => {
    //     let gotchisResponse = useSWR("/api/gotchiverse/stats", Fetcher);


    //     if (gotchisResponse.data) {
    //         data = gotchisResponse.data[dataField];
    //         console.log("DATA GOTTEN!", data);

    //     }

    // };

    let gotchisResponse = useSWR("/api/gotchiverse/stats", Fetcher);
    
    if (gotchisResponse.data) {
        data = gotchisResponse.data[dataField];
        console.log("DATA GOTTEN!", data);

    }

    // fetchData();

    console.log(data, "datas Logged");

    return (

        <section>
            <div className = "wrapper">
                <div className = "title">
                    {title}

                </div>
                <div className = "body">
                    {
                        coins.map((coin, index) => {
                            return (
                                <div className = "body_data" key = {index}>
                                    <div className = "coin_wrapper">
                                        <Image
                                        src={ `/static/images/${coin}.png`}
                                        alt="trending"
                                        width="28"
                                        height="28"
                                        />
                                        <div className = "coinName">
                                            {coin}
                                        </div>
                                    </div>
                                    <div className = "body_numeric_data">
                                        {/* {Math.floor((parseInt(data[index])/1*10**15))} */}
                                        
                                        {SuffixShortener(parseInt(data[index]))}
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
            <style jsx>
                {`

                .wrapper {
                                        
                    color: black;
                    border: 1px solid #000000;
                    background: white;
                    height: 210px;
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    
                    
                }

                .title {
                    height: 100px;
                    font-size: 30px;
                    width: 80%;
                    padding-top: 15px;
                    padding-left: 20px;
                    line-height: 100%;
                    font-weight: 800;
                }

                .body {
                    
                    display: flex;
                    flex-wrap: wrap;
                }

                .body_data {
                    width: 50%;
                    display: flex;

                }

                .coin_wrapper {
                    margin-left: 20px;
                }

                .coinName {

                    text-align: center;
                    font-weight: 800;
                    transform: translateY(-40%);
                }

                .body_numeric_data {

                    flex: 1;
                    text-align: center;
                    font-size: 32px;

                }


                `}
            </style>



        </section>
    )




};



export default AlchemicaCardData;