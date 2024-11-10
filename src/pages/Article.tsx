import React from "react";
import { Card, Col, Row, Select } from "antd";

const { Meta } = Card;
const { Option } = Select;

const articles = [
    {
        category: "Eksplorasi",
        date: "05 Nov 2024",
        title: "Peran Media sebagai 'Pilar Keempat' dalam Melawan Korupsi di Indonesia",
        views: 271,
        image: "path/to/image1.jpg",
    },
    {
        category: "Informasi",
        date: "05 Nov 2024",
        title: "Akselerasi Pembangunan Corpu, KPK Adakan Workshop 'INSPIRASI'",
        views: 162,
        image: "path/to/image2.jpg",
    },
    {
        category: "Persepsi",
        date: "01 Nov 2024",
        title: "Adakah Masa Kedaluwarsa Pidana Gratifikasi?",
        views: 731,
        image: "path/to/image3.jpg",
    },
    {
        category: "Informasi",
        date: "31 Okt 2024",
        title: "TUK Antikorupsi BTN: Terobosan LSP KPK Buka Era Baru Sertifikasi Antikorupsi",
        views: 1474,
        image: "path/to/image4.jpg",
    },
];

const Article: React.FC = () => {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Artikel</h1>
                <Select defaultValue="Semua" className="w-32">
                    <Option value="Semua">Semua</Option>
                    <Option value="Eksplorasi">Eksplorasi</Option>
                    <Option value="Informasi">Informasi</Option>
                    <Option value="Persepsi">Persepsi</Option>
                </Select>
            </div>
            <Row gutter={[16, 16]}>
                {articles.map((article, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card
                            hoverable
                            cover={<img alt={article.title} src={article.image} />}
                            className="h-full"
                        >
                            <div className="text-gray-500 text-sm">{article.category}</div>
                            <div className="text-gray-500 text-sm">{article.date}</div>
                            <Meta
                                title={<div className="text-lg font-semibold">{article.title}</div>}
                                description={<div className="text-gray-500 text-sm">{article.views} views</div>}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Article;
