import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Fetcher from "../fetcher";
import { Card, Col, Row } from "react-bootstrap";
import GrassRugDataCard from "./GrassRugDataCard";

interface GrassRugDataProps {
    queryURL : string;
}


function GrassRugData({queryURL} : GrassRugDataProps) {

    let dataArray : string[] = [];


    let response = useSWR(queryURL, Fetcher);
    if (response.data) {
        console.log(response, "hello");

    }
    

    return (
        <Row>
            <Col>
            <GrassRugDataCard />
            </Col>
            <Col>
            <GrassRugDataCard />
            </Col>
            <Col>
            <GrassRugDataCard />
            </Col>
            <Col>
            <GrassRugDataCard />
            </Col>

        </Row>
    )


};


export default GrassRugData;