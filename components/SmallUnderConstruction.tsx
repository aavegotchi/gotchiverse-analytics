import Image from "next/image";

const buttons: number[] = [30, 7, 24, 100];

interface SmallUnderConstruction {
    title: string;
}

function SmallUnderConstruction({ title }: SmallUnderConstruction) {
    return (
        <section>
            <div className="wrapper">
                <div className="blur_wrapper">
                    <div className="title">
                        <div className="title_name">{title}</div>
                        <div className="title_trend">
                            <Image
                                src={`/static/images/trending-up.png`}
                                alt="trending"
                                width="62"
                                height="55"
                            />
                        </div>
                    </div>
                    <div className="body">
                        <div className="body_data">UNAVAILABLE</div>

                        <div className="trend_data">--%</div>
                    </div>

                    <div className="footer">
                        <div className="buttons">
                            {buttons.map((buttonTimeLine, index) => {
                                return (
                                    <button
                                        className="footer_button"
                                        disabled
                                        key={index}
                                    >
                                        {index === 3
                                            ? "total"
                                            : index === 2
                                            ? `${buttonTimeLine} h`
                                            : `${buttonTimeLine} d`}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>
                {`
                    .wrapper {
                        border: 1px solid black;
                        height: 300px;
                    }

                    .blur_wrapper {
                        filter: blur(2px);
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
                        font-size: 40px;
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

export default SmallUnderConstruction;
