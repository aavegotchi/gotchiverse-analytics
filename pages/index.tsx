import { useState } from "react";
import { Button } from "react-bootstrap";
import useSWR from "swr";
import ChartTest from "../components/chartTest2";
import Fetcher from "../fetcher";

export default function Home() {
    const [interval, setInterval] = useState(7);
    const [field, setField] = useState("tilesMinted");

    let data: string[] = [];

    const showInterval = () => {
        let gotchiverseStats7dResponse = useSWR(
            `/api/gotchiverse/stats/${interval}/series`,
            Fetcher
        );

        if (gotchiverseStats7dResponse.data) {
            data = gotchiverseStats7dResponse.data.map((e: any) => {
                return e.data[field];
            });
        }
    };

    showInterval();

    return (
        <div>
            <ChartTest title="Test" data={data} />
            <Button onClick={() => setInterval(7)}>Show 7D</Button>
            <Button onClick={() => setInterval(30)}>Show 30D</Button>
            <Button onClick={() => setField("tilesMinted")}>
                Show Tiles Minted
            </Button>
            <Button onClick={() => setField("installationsMintedTotal")}>
                Show Installations Minted
            </Button>
        </div>
    );
}
