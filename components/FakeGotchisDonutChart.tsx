import { Card, Col, Row } from "react-bootstrap";
import DonutChartGotchis from "./DonutChartGotchis";
import { data } from "./DataFile/FakeGotchisData";

interface FakeGotchisDonutChart {
    title: string;
    label: string;
    Values: number;
}

function FakeGotchisDonutChart() {
    return (
        <section>
            <div className="wrapper">
                <Row>
                    <Col md={4}>
                        <DonutChartGotchis />
                    </Col>
                    <Col md={8}>Hello go</Col>
                </Row>
            </div>

            <style jsx>
                {`
                    .wrapper {
                    }
                `}
            </style>
        </section>
    );
}

export default FakeGotchisDonutChart;
