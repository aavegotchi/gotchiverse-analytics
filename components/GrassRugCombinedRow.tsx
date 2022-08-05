import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Fetcher from "../fetcher";
import { Card, Col, Row } from "react-bootstrap";
import GrassRugDataCard from "./GrassRugDataCard";

interface ResponseItem {
    name: string;
    amount: string;
}

function GrassRugCombinedRow() {
    let dataArray: ResponseItem[] = [];

    let grassResponse = useSWR("/api/grass", Fetcher);
    let rugsResponse = useSWR("/api/rugs", Fetcher);
    if (grassResponse.data && rugsResponse.data) {
        dataArray = grassResponse.data.concat(rugsResponse.data);
    }

    return (
        <Row>
            {dataArray &&
                dataArray.map((responseItem: ResponseItem, index: number) => {
                    let imageURL: string = "";

                    if (responseItem.name == "LE Purple Grass") {
                        imageURL = "PurpleGrass.png";
                    } else if (responseItem.name == "LE Cyan Grass") {
                        imageURL = "CyanGrass.png";
                    } else if (responseItem.name == "LE Godlike Rofl Rug") {
                        imageURL = "LeGodLikeRug.png";
                    } else {
                        imageURL = "LeMythicalRug.png";
                    }
                    return (
                        <Col md={3} key={index}>
                            <GrassRugDataCard
                                title={responseItem.name}
                                data={responseItem.amount}
                                imageURL={imageURL}
                            />
                        </Col>
                    );
                })}
        </Row>
    );
}

export default GrassRugCombinedRow;
