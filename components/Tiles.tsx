import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Fetcher from "../fetcher";
import { Card, Col, Row } from "react-bootstrap";
import TileCard from "./TileCard";
import axios from "axios";
interface Tile {
    name: string;
    amount: string;
}

function Tiles(): JSX.Element {
    const [tiles, setTiles] = useState<Tile[]>([]);

    useEffect(() => {
        axios.get("/api/tiles").then((res) => setTiles(res.data));
    });

    return (
        <Row>
            {tiles.length > 0 &&
                tiles.map((tile: Tile, index: number) => {
                    let imageURL: string = "";

                    if (tile.name == "LE Purple Grass") {
                        imageURL = "PurpleGrass.png";
                    } else if (tile.name == "LE Cyan Grass") {
                        imageURL = "CyanGrass.png";
                    } else if (tile.name == "LE Godlike Rofl Rug") {
                        imageURL = "LeGodLikeRug.png";
                    } else {
                        imageURL = "LeMythicalRug.png";
                    }
                    return (
                        <Col md={3} key={index}>
                            <TileCard
                                title={tile.name}
                                data={tile.amount}
                                imageURL={imageURL}
                            />
                        </Col>
                    );
                })}
        </Row>
    );
}

export default Tiles;
