// export default Home
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { Col, Image, Row } from "react-bootstrap";

// components here
import AlchemicaCardDataV2 from "../components/AlchemicaCardDataV2";
import Tiles from "../components/Tiles";
import GotchisStats from "../components/GotchisStats";
import StakingPools from "../components/StakingPools";
import DataCard from "../components/DataCard";
import AlchemicaBarChart from "../components/AlchemicaBarChart";
import axios from "axios";
import AlchemicaTotalSupply from "../components/AlchemicaTotalSupply";
import FakeGotchisDonutChart from "../components/FakeGotchisDonutChart";

interface dataObject {
  title: string;
  dataField: string;
}

const Home: NextPage = () => {
  // ============================ graph below =====================
  const [dataToBeDisplayed, setDataToBeDisplayed] = useState<string>("");

  const [graphTitle, setGraphTitle] = useState<string>("");

  const [graphData7d, setGraphData7d] = useState<object>({});

  const [graphData30d, setGraphData30d] = useState<object>({});

  const [graphObject, setGraphObject] = useState<dataObject>({
    title: "INSTALLATIONS MINTED",
    dataField: "installationsMintedTotal",
  });

  useEffect(() => {
    function setData() {
      setDataToBeDisplayed("installationsMintedTotal");
      setGraphTitle("installationsMintedTotal");
    }

    setData();
  }, []);

  // objects

  // ======================= Alchemica stuff =====================

  const alchemicaObjects: dataObject[] = [
    {
      title: "ALCHEMICA SPENT ON TILES",
      dataField: "alchemicaSpendOnTiles",
    },
    {
      title: "ALCHEMICA SPENT ON INSTALLATIONS",
      dataField: "alchemicaSpendOnInstallations",
    },
    {
      title: "ALCHEMICA SPENT ON UPGRADES",
      dataField: "alchemicaSpendOnUpgrades",
    },
  ];
  //======================== row 1 ==============================

  const rowOneObjects: dataObject[] = [
    {
      title: "TILES MINTED",
      dataField: "tilesMinted",
    },
    {
      title: "INSTALLATIONS MINTED",
      dataField: "installationsMintedTotal",
    },
    {
      title: "INSTALLATIONS UPGRADED TOTAL",
      dataField: "installationsUpgradedTotal",
    },
  ];

  return (
    <>
      <div className="mainWrapper">
        <div className="headerSection">
          <h2 className="title mainTitle">State of the Gotchiverse</h2>
          <div className="welcome_gotchi_container">
            <div className="gotchi">
              <Image
                src={`/static/images/aavegotchiWelcome.png`}
                alt="gotchiWelcome"
                width="100"
                height="100"
              />
            </div>
            <div className="message">
              <Image
                src={`/static/images/HelloMessage.png`}
                alt="hellmoMessage"
                width="100"
                height="80"
              />
            </div>
          </div>
          <a
            className="GitLink"
            href="https://github.com/aavegotchi/gotchiverse-analytics"
            rel="noreferrer"
          >
            <div className="github_Link">
              <Image src="/static/images/git.svg" />
              GitHub
            </div>
          </a>
        </div>
        <Row>
          {alchemicaObjects.map((alchemica, index) => {
            return (
              <Col key={index}>
                <AlchemicaCardDataV2
                  title={alchemica.title}
                  dataField={alchemica.dataField}
                />
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col md="8">
            <AlchemicaBarChart />
          </Col>
          <Col md="4">
            <StakingPools />
          </Col>
        </Row>

        <Row>
          {rowOneObjects.map((data, index) => {
            return (
              <Col key={index}>
                <DataCard title={data.title} dataField={data.dataField} />
              </Col>
            );
          })}
        </Row>
        <h2 className="title">Total Supply of Alchemica</h2>
        <AlchemicaTotalSupply />

        <h2 className="title">Gotchi Utilization</h2>
        <GotchisStats />
        <h2 className="title">Tiles</h2>
        <Tiles />
        <Row>
          <h2 className="title">FAKE Card distribution</h2>
          <FakeGotchisDonutChart cards={true} />
          <h2 className="title">FAKE Gotchis distribution</h2>
          <FakeGotchisDonutChart cards={false} />
        </Row>
      </div>

      <style jsx>
        {`
          .headerSection {
            display: flex;

            width: 100%;
          }
          .title {
            width: 100%;
            text-align: left;
            font-size: 46px;
            font-weight: 400;
            line-height: 42.73px;
            color: black;
            margin-top: 20px;
          }

          .welcome_gotchi_container {
            position: relative;
            padding-top: 10px;
            right: 16%;

            width: 90px;
          }

          .github_Link {
            align-self: end;
            width: 100px;
            height: 50px;
            background-color: #301b69;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            padding: 20px;
            border-radius: 5px;
            transform: translateY(10px);
            gap: 10px;
            font-size: 22px;
            transition: 0.5s ease-in-out;
            cursor: pointer;
          }

          .github_Link:hover {
            background-color: white;
            color: #301b69;
          }

          .gotchi {
            position: absolute;
          }

          .message {
            position: absolute;
            right: -80%;
            top: -60%;
          }

          .mainTitle {
            text-align: center;
            font-weight: 800;
            font-size: 50px;
          }

          .debug {
            height: 100%;
          }

          .pools_wrapper {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .mainWrapper {
            width: 1100px;
            padding: 60px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .wrapper_helper {
            display: flex;
            justify-content: space-around;
            gap: 22px;
          }

          .footerSpace {
            width: 100%;
            margin-top: 100px;
            height: 40px;
            background-color: #200449;
          }

          .scrollbar::-webkit-scrollbar {
            width: 20px;
            background-color: black;
          }

          @media (max-width: 600px) {
            .mainWrapper {
              width: 100%;
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  );
};

export default Home;
