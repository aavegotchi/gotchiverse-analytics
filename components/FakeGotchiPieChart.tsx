import useSWR from "swr";
import Fetcher from "../fetcher";
import { AavegotchiPieChart } from "./charts/PieChart";

export function FakeGotchiPieChart() {

    const getData = () => {
        const data = useSWR("/api/fakegotchis", Fetcher);
        
    }
    const labels = ["User 1", "User 2", "User 3", "User 4", "User 5"];

    const values = [1, 5, 10, 12, 25];

    return <AavegotchiPieChart label="Fake Gotchi Owner" labels={labels} values={values} />;
}
