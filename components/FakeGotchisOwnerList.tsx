interface FakeGotchisOwnerListProps {
    id: string;
    amountOwned: string;
}

function FakeGotchisOwnerList({ id, amountOwned }: FakeGotchisOwnerListProps) {
    return (
        <section>
            <div className="wrapper">
                <div className="wallet">Wallet: {id}</div>
                <div className="amount">test {amountOwned}</div>
            </div>
            <style jsx>
                {`
                    .wrapper {
                        height: 60px;
                        width: 100%;
                        border-bottom: 1px solid black;
                        display: flex;
                        justify-content: space-around;
                    }

                    .wallet {
                        font-size: 25px;
                        padding: 5px;
                    }

                    .amount {
                        font-size: 25px;
                        padding: 5px;
                    }
                `}
            </style>
        </section>
    );
}

export default FakeGotchisOwnerList;
