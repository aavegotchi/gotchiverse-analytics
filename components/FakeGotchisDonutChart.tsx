import React from "react";
import { useState } from "react";

import { Card, Col, Row } from "react-bootstrap";
import DonutChartGotchis from "./DonutChartGotchis";
import FakeGotchisOwnerList from "./FakeGotchisOwnerList";
import useSWR from "swr";
import Fetcher from "../fetcher";

interface FakeGotchisDonutChart {
    title: string;
    label: string;
    Values: number;
}

interface dataObject {
    id: string;
    ownerOfAmount: string;
}

function FakeGotchisDonutChart() {
    let arrayWalletID: string[] = [];
    let arrayOwnerAmount: string[] = [];
    let fakeGotchisResponse = useSWR("/api/fakeGotchis");
    console.log(fakeGotchisResponse, "hello worlds");
    if (fakeGotchisResponse.data) {
        // fakeGotchisResponse.map(() => {});

        fakeGotchisResponse.data.forEach((data: dataObject, index: number) => {
            if (data.id === "0x0000000000000000000000000000000000000000") {
                return;
            }
            arrayWalletID.push(data.id);
            arrayOwnerAmount.push(data.ownerOfAmount);
        });
    }

    return (
        <section>
            <div className="wrapper">
                <Row>
                    <Col md={4}>
                        {arrayWalletID && arrayOwnerAmount && (
                            <DonutChartGotchis
                                title={"Fake Gotchis Owners"}
                                label={arrayWalletID}
                                values={arrayOwnerAmount}
                            />
                        )}
                    </Col>
                    <Col md={8}>
                        <div className="fakeGotchisListWrapper">
                            {fakeGotchisResponse.data &&
                                fakeGotchisResponse.data.map(
                                    (data: dataObject, index: number) => {
                                        return (
                                            <FakeGotchisOwnerList
                                                key={index}
                                                id={data.id}
                                                amountOwned={data.ownerOfAmount}
                                            />
                                        );
                                    }
                                )}
                        </div>
                    </Col>
                </Row>
            </div>

            <style jsx>
                {`
                    .wrapper {
                    }

                    .fakeGotchisListWrapper {
                        border: 1px solid black;
                        overflow-y: scroll;
                        height: 350px;
                    }
                `}
            </style>
        </section>
    );
}

export default FakeGotchisDonutChart;
