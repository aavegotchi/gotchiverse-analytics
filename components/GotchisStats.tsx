import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Fetcher from "../fetcher";
import { Row, Col } from "react-bootstrap";
import SmallDataCardEditedV2 from "./SmallDataCardEditedV2";

interface dataObject {
    title: string;
    dataField: string;
    data: any[];
}

const gotchisObjects: dataObject[] = [
    {
        title: "GOTCHIS BORROWED",
        dataField: "aavegotchisBorrowed",
        data: [],
    },
    {
        title: "GOTCHIS CLAIMED",
        dataField: "aavegotchisClaimed",
        data: [],
    },
    {
        title: "GOTCHIS SACRIFICED",
        dataField: "aavegotchisSacrificed",
        data: [],
    },
    {
        title: "GOTCHIS CHANNELED",
        dataField: "aavegotchisChanneled",
        data: [],
    },
];

function GotchisStats() {
    let gotchisRes = useSWR("/api/gotchis/stats", Fetcher);
    let gotchisRes24h = useSWR("/api/gotchis/stats/1", Fetcher);
    let gotchisRes7d = useSWR("/api/gotchis/stats/7", Fetcher);
    let gotchisRes30d = useSWR("/api/gotchis/stats/30", Fetcher);

    console.log(gotchisRes, "gotchisResTotal");
    console.log(gotchisRes24h, "gotchisRes24");
    console.log(gotchisRes7d, "gotchisRes7");
    console.log(gotchisRes30d, "gotchisRes30");

    const appendData = () => {
        console.log(gotchisRes24h.data[gotchisObjects[0].dataField], "wwtf?");
        gotchisObjects.forEach((gotchiObject, index) => {
            gotchiObject.data = [
                gotchisRes24h.data[gotchiObject.dataField],
                gotchisRes7d.data[gotchiObject.dataField],
                gotchisRes30d.data[gotchiObject.dataField],
                gotchisRes.data[gotchiObject.dataField],
            ];
        });
        console.log(gotchisObjects);
    };

    if (
        gotchisRes.data &&
        gotchisRes24h.data &&
        gotchisRes7d.data &&
        gotchisRes30d.data
    ) {
        appendData();
    }

    return (
        <Row>
            {gotchisObjects.map((gotchiObject, index) => {
                // if (gotchiObject.dataField === "aavegotchisChanneled") {
                //     return <Col key={index}>Hello world</Col>;
                // }
                return (
                    gotchiObject.data && (
                        <Col key={index}>
                            <SmallDataCardEditedV2
                                title={gotchiObject.title}
                                dataField={gotchiObject.dataField}
                                data={gotchiObject.data}
                            />
                        </Col>
                    )
                );
            })}
        </Row>
    );
}

export default GotchisStats;
