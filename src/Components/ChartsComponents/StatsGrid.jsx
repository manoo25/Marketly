import React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { ArrowUpRight, ArrowDownRight, DollarSign, Eye, ShoppingCart, Users } from 'lucide-react';

const stats = [
    {
        title: "إجمالي المبيعات",
        value: "$124,563",
        change: "+12.5%",
        trend: "up",
        icon: DollarSign,
        variant: "success",
    },
    {
        title: "المستخدمين النشطين",
        value: "8,549",
        change: "+8.2%",
        trend: "up",
        icon: Users,
        variant: "primary",
    },
    {
        title: "المشتريات",
        value: "2,847",
        change: "+15.3%",
        trend: "up",
        icon: ShoppingCart,
        variant: "warning",
    },
    {
        title: " المشاهدات",
        value: "$45,892",
        change: "-2.1%",
        trend: "down",
        icon: Eye,
        variant: "danger",
    },
];

function StatsGrid() {
    return (
        <Container fluid>
            <Row>
                {stats.map((stat, index) => (
                    <Col md={6} lg={3} key={index} className="mb-4">
                        <Card className="h-100 shadow-sm border-light " style={{ borderRadius: '1.5rem' }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <Card.Subtitle className="text-muted mb-2">{stat.title}</Card.Subtitle>
                                        <Card.Title className="fs-2 fw-bold mb-2">{stat.value}</Card.Title>
                                        <div className="d-flex align-items-center">
                                            {stat.trend === "up" ? <ArrowUpRight className="text-success me-1" size={16} /> : <ArrowDownRight className="text-danger me-1" size={16} />}
                                            {stat.trend === "up" ? <span className="text-muted me-1">زيادة</span> : <span className="text-muted">انخفاض</span>}
                                            <span className={`text-${stat.trend === 'up' ? 'success' : 'danger'} me-1`}>{stat.change}</span>
                                            <span className="text-muted me-1"> عن أمس </span>
                                        </div>
                                    </div>
                                    <div className={`p-3 bg-${stat.variant}-subtle`} style={{ borderRadius: '1.5rem' }}>
                                        <stat.icon className={`text-${stat.variant}`} size={24} />
                                    </div>
                                </div>
                                <ProgressBar now={stat.trend === "up" ? 75 : 45} variant={stat.variant} className="mt-3" style={{ height: '6px' }} />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default StatsGrid;
