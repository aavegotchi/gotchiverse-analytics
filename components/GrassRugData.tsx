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

  return (
    <Row>
      {dataArray &&
        dataArray.map((responseItem, index) => {
          return (
            <Col md={3} key={index}>
              <GrassRugDataCard
                title={responseItem.name}
                data={responseItem.amount}
              />
            </Col>
          );
        })}
    </Row>
  );
}

export default GrassRugData;
