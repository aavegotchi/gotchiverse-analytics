import React from "react";
import numeral from "numeral";
import { useState, useEffect } from "react";
import axios from "axios";
interface GrassRugDataCardProps {
    id: string;
    title: string;
    data: string;
    imageURL: string;
}

const buttons: number[] = [30, 7, 24, 100];

function GrassRugDataCard({
    id,
    title,
    data,
    imageURL,
}: GrassRugDataCardProps) {
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        const fetchImage = async function (url: string) {
            const response = await axios.get(url);

            setImage(response.data.image);
        };

        if (imageURL != "") {
            fetchImage(imageURL);
        } else {
            fetchImage(`https://app.aavegotchi.com/metadata/tile/${id}`);
        }
    }, []);

    return (
        <section>
            <div className="wrapper">
                <div className="background"></div>
                <div className="title">
                    <div className="title_name">{title}</div>
                    <div className="body_data">
                        {data != null ? numeral(data).format("0,0") : "Loading"}
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .wrapper {
                        border: 1px solid black;
                        width: 100%;
                        height: 300px;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        position: relative;
                        margin-bottom: 20px;
                        
                    }

                    .background {
                        background-image: url(${image});
                        background-position: center;
                        width: 100%;
                        height: 100%;
                        opacity: 0.6;

                    }

                    .title {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        flex-direction: column;
                        text-align: center;
                        position: absolute;
                        
                    }

                    .title_name {
                        font-size: 32px;
                        font-weight: 800;
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
                        align-items: center;
                        text-align: center;
                    }

                    .body_data {
                        font-size: 50px;
                        font-weight: 800;
                        line-height: 100%;
                        margin-bottom: 15px;
                        padding-bottom: 20px;
                        text-align; center;

                        
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
