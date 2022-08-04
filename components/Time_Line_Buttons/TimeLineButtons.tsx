interface TimeLineButtonsProps {
    timeLine: number;
    setTimeLine: React.Dispatch<React.SetStateAction<number>>;
}

const buttons: number[] = [24, 7, 30, 100];

export default function TimeLineButtons({
    timeLine,
    setTimeLine,
}: TimeLineButtonsProps) {
    return (
        <>
            <div className="buttons">
                {buttons.map((buttonTimeLine, index) => {
                    return (
                        <button
                            key={index}
                            className="timeLineButton"
                            onClick={() => {
                                setTimeLine(index);
                            }}
                            disabled={index === timeLine}
                        >
                            {index === 3
                                ? "total"
                                : index === 0
                                ? `${buttonTimeLine} h`
                                : `${buttonTimeLine} d`}
                        </button>
                    );
                })}
            </div>

            <style jsx>
                {`
                    .buttons {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        width: 95%;
                    }

                    .timeLineButton {
                        height: 40px;

                        background: #b8b8b8;
                        border: none;
                        border-bottom: 3px solid #d9d9d9;
                        background: transparent;
                        text-align: center;
                        color: #666666;
                        font-size: 22px;
                        font-weight: 800;
                        line-height: 20.44px;
                        flex: 1;
                        transition: 0.5s;
                        padding: 2px;
                    }

                    .timeLineButton:disabled {
                        border: none;
                        border-bottom: 3px solid #fa34f3;
                        color: #fa34f3;
                        pointer-events: none;
                    }
                `}
            </style>
        </>
    );
}
