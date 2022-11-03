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
  amountTokens: Number;
}

interface FakeGotchisDonutChartProps {
  cards: Boolean;
}

function FakeGotchisDonutChart({ cards }: FakeGotchisDonutChartProps) {
  let arrayWalletID: string[] = [];
  let arrayOwnerAmount: Number[] = [];

  let fakeGotchisResponse;
  if (!cards) {
    fakeGotchisResponse = useSWR("/api/fakeGotchis", Fetcher);
  } else {
    fakeGotchisResponse = useSWR("/api/fakeGotchis/cards", Fetcher);
  }

  if (fakeGotchisResponse.data) {
    // fakeGotchisResponse.map(() => {});

    fakeGotchisResponse.data.forEach((data: dataObject, index: number) => {
      if (data.id === "0x0000000000000000000000000000000000000000") {
        return;
      }
      arrayWalletID.push(data.id);
      arrayOwnerAmount.push(data.amountTokens);
    });

    console.log(arrayWalletID);
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
                    if (
                      data.id === "0x0000000000000000000000000000000000000000"
                    ) {
                      return;
                    }
                    return (
                      <FakeGotchisOwnerList
                        key={index}
                        id={data.id}
                        amountToken={data.amountTokens}
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
            background-color: white;
          }

          .fakeGotchisListWrapper {
            border: 1px solid black;
            overflow-y: scroll;
            height: 410px;
          }
        `}
      </style>
    </section>
  );
}

export default FakeGotchisDonutChart;
