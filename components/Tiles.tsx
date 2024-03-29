import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Fetcher from "../fetcher";
import { Card, Col, Row } from "react-bootstrap";
import TileCard from "./TileCard";
import axios from "axios";
interface Tile {
    id: string;
    name: string;
    amount: string;
    uri: string;
}

function Tiles(): JSX.Element {
    const [tiles, setTiles] = useState<Tile[]>([]);

    useEffect(() => {
        axios.get("/api/tiles").then((res) => {
            const sortedTiles = res.data.sort((a: Tile, b: Tile) => {
                return parseInt(a.id) < parseInt(b.id) ? -1 : 1;
            });

            setTiles(sortedTiles);
        });
    }, []);

    return (
        <Row>
            {tiles.length > 0 &&
                tiles.map((tile: Tile, index: number) => {
                    let imageURL: string = "";

                    if (tile.uri == null || tile.name === "The Void") {
                        imageURL = "";
                    } else {
                        imageURL = tile.uri;
                    }

                    return (
                        <Col md={3} key={index}>
                            <TileCard
                                id={tile.id}
                                title={tile.name}
                                data={tile.amount}
                                imageURL={imageURL}
                            />
                        </Col>
                    );
                })}
            <style jsx>
                {`
                    .section_wrapper {
                        display: flex;
                    }
                `}
            </style>
        </Row>
    );
}

export default Tiles;
