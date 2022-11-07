import { Card } from "react-bootstrap";
import useSWR from "swr";

export interface RugType {
  name: String;
  amount: String;
}
export interface RugCardProps {
  types: [RugType];
}
export function RugCard({ types }: RugCardProps): JSX.Element {
  if (!types) {
    return <></>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Rugs</Card.Title>
        {types.map((e, i) => (
          <div key={i}>
            {e.name}: {e.amount}
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}
