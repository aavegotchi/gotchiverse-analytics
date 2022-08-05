interface FakeGotchisOwnerListProps {
    id: string;
    amountOwned: string;
}

function FakeGotchisOwnerList({ id, amountOwned }: FakeGotchisOwnerListProps) {
    return (
        <section>
            <div className="wrapper">
                <div>Wallet: {id}</div>
                <div>test {amountOwned}</div>
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
                `}
            </style>
        </section>
    );
}

export default FakeGotchisOwnerList;
