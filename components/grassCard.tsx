import { Card } from "react-bootstrap";
import useSWR from "swr";

export interface GrassType {
    name: String;
    amount: String;
}
export interface GrassCardProps {
    types: [GrassType];
}
export function GrassCard({ types }: GrassCardProps): JSX.Element {
    if (!types) {
        return <></>;
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Grass</Card.Title>
                {types.map((e, i) => (
                    <div key={i}>
                        {e.name}: {e.amount}
                    </div>
                ))}
            </Card.Body>
        </Card>
    );
}
