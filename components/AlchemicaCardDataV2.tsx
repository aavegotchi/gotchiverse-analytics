import useSWR from "swr";
import Fetcher from "../fetcher";
import Image from "next/image";
import SuffixShortener from "./helperFunctions/SuffixShortener";
import { ethers, BigNumber } from "ethers";


interface AlchemicaCardProps {
    title: string;
    dataField: string;
}




const coins : string[] = [
    "FUD", "FOMO", "ALPHA", "KEK"
];


function AlchemicaCardDataV2({title, dataField} : AlchemicaCardProps) {

    let data : string[] = [];

    const setData = () => {
        let gotchisResponse = useSWR("/api/gotchiverse/stats", Fetcher);


        if (gotchisResponse.data) {
            data = gotchisResponse.data[dataField];
            console.log("DATA GOTTEN!", data);
            console.log(typeof data[0]);

        }

    };
    console.log(ethers.BigNumber.from("42"));

    let a : object = ethers.BigNumber.from("42");
    
    setData();

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
                                        {data[index].slice(0, -18)}
                                        

                                    </div>``
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
                    flex-direction: column;
                    
                }

                .body_data {

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

                    margin-left: 20px;
                    font-size: 32px;
                    

                }


                `}
            </style>



        </section>
    )




};



export default AlchemicaCardDataV2;