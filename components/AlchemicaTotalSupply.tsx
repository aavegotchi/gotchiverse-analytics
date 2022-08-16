import axios from "axios";
import React from "react";

import { useState, useEffect } from "react";
import SmallDataCardEditedV2 from "./SmallDataCardEditedV2";
import { Col, Image, Row } from "react-bootstrap";

interface tokenData {
    token: string;
    data: number[];
}

export default function AlchemicaTotalSupply() {
    const [FUDData, setFUDData] = useState<number[]>([]);
    const [FOMOData, setFOMOData] = useState<number[]>([]);
    const [ALPHAData, setALPHAData] = useState<number[]>([]);
    const [KEKData, setKEKData] = useState<number[]>([]);

    const tokens: tokenData[] = [
        {
            token: "FUD",
            data: FUDData,
        },
        {
            token: "FOMO",
            data: FOMOData,
        },
        {
            token: "ALPHA",
            data: ALPHAData,
        },
        {
            token: "KEK",
            data: KEKData,
        },
    ];

    useEffect(() => {
        const getData = async function (tokenData: tokenData) {
            let query24h = `/api/alchemica/${tokenData.token}/1`;
            let query7d = `/api/alchemica/${tokenData.token}/7`;
            let query30d = `/api/alchemica/${tokenData.token}/30`;
            let queryTotal = `/api/alchemica/${tokenData.token}/30`; //@todo  add total supply of token here

            const [response24h, response7d, response30d, responseTotal] =
                await Promise.all([
                    axios.get(query24h),
                    axios.get(query7d),
                    axios.get(query30d),
                    axios.get(queryTotal),
                ]);

            const data: number[] = [
                response24h.data.supply,
                response7d.data.supply,
                response30d.data.supply,
                responseTotal.data.supply,
            ];

            tokenData.data = data;
            if (tokenData.token === "FUD") {
                setFUDData(data);
            } else if (tokenData.token === "FOMO") {
                setFOMOData(data);
            } else if (tokenData.token === "ALPHA") {
                setALPHAData(data);
            } else if (tokenData.token === "KEK") {
                setKEKData(data);
            }
        };

        tokens.map(getData);
    }, []);

    return (
        <Row>
            {tokens.map((tokenData: tokenData, index: number) => {
                let title: string = `TOTAL SUPPLY  ${tokenData.token}`;
                return (
                    tokenData.data && (
                        <Col key={index}>
                            <SmallDataCardEditedV2
                                data={tokenData.data}
                                title={title}
                            />
                        </Col>
                    )
                );
            })}
        </Row>
    );
}
