import React from "react";
import useSWR from "swr";
import Fetcher from "../fetcher";
import { Row, Col } from "react-bootstrap";
import SmallDataCardEditedV2 from "./SmallDataCardEditedV2";
import SmallUnderConstruction from "./SmallUnderConstruction";

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

    const appendData = () => {
        gotchisObjects.forEach((gotchiObject, index) => {
            gotchiObject.data = [
                gotchisRes30d.data[gotchiObject.dataField],
                gotchisRes7d.data[gotchiObject.dataField],
                gotchisRes24h.data[gotchiObject.dataField],
                parseInt(gotchisRes.data[gotchiObject.dataField]),
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
                if (gotchiObject.dataField === "aavegotchisChanneled") {
                    return (
                        <Col key={index}>
                            <SmallUnderConstruction
                                title={gotchiObject.title}
                            />
                        </Col>
                    );
                }
                return (
                    gotchiObject.data && (
                        <Col key={index}>
                            <SmallDataCardEditedV2
                                title={gotchiObject.title}
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
