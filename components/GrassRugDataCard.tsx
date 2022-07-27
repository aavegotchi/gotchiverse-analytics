interface GrassRugDataCardProps {
    title: string;
    data: string;
}

function GrassRugDataCard({ title, data }: GrassRugDataCardProps) {
    return (
        <section>
            <div className="wrapper">Hello world</div>
            <style jsx>
                {`
                    .wrapper {
                        border: 1px solid black;
                        width: 100%;
                        height: 300px;
                    }
                `}
            </style>
        </section>
    );
}

export default GrassRugDataCard;
