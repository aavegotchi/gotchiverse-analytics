import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Fetcher from "../fetcher";
import { Card, Col, Row } from "react-bootstrap";
import GrassRugDataCard from "./GrassRugDataCard";

interface GrassRugDataProps {
    queryURL: string;
}

interface ResponseItem {
    name: string;
    amount: string;
}

function GrassRugData({ queryURL }: GrassRugDataProps) {
    let dataArray: ResponseItem[] = [];

    let response = useSWR(queryURL, Fetcher);
    if (response.data) {
        dataArray = response.data;
    }
    console.log("grass rugs dataa");

    return (
        <Row>
            {dataArray &&
                dataArray.map((responseItem, index) => {
                    let imageURL = "PurpleGrass.png";
                    console.log(responseItem.name, "names hello mount");

                    if (responseItem.name == "LE Purple Grass") {
                        imageURL = "PurpleGrass.png";
                    } else if (responseItem.name == "LE Cyan Grass") {
                        imageURL = "CyanGrass.png";
                    } else if (responseItem.name == "LE Godlike Rofl") {
                        imageURL = "LeGodLikeRug.png";
                    } else {
                        imageURL = "LeMythicalRug.png";
                    }
                    return (
                        <Col md={6} key={index}>
                            <GrassRugDataCard
                                title={responseItem.name}
                                data={responseItem.amount}
                                imageURL={imageURL}
                            />
                        </Col>
                    );
                })}
            <style jsx>{``}</style>
        </Row>
    );
}

export default GrassRugData;
