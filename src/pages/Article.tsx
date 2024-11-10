import React, { useState } from "react";
import { Card, Col, Row, Select, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Option } = Select;

const articles = [
    {
        category: "Eksplorasi",
        date: "05 Nov 2024",
        title: "Peran Media sebagai 'Pilar Keempat' dalam Melawan Korupsi di Indonesia",
        publisher: "kemal pasha",
        image: "/assets/1.jpg",
    },
    {
        category: "Informasi",
        date: "05 Nov 2024",
        title: "Akselerasi Pembangunan Corpu, KPK Adakan Workshop 'INSPIRASI'",
        publisher: "kemal pasha",
        image: "/assets/2.jpg",
    },
    {
        category: "Persepsi",
        date: "01 Nov 2024",
        title: "Adakah Masa Kedaluwarsa Pidana Gratifikasi?",
        publisher: "kemal pasha",
        image: "/assets/3.jpg",
    },
    {
        category: "Informasi",
        date: "31 Okt 2024",
        title: "TUK Antikorupsi BTN: Terobosan LSP KPK Buka Era Baru Sertifikasi Antikorupsi",
        publisher: "kemal pasha",
        image: "/assets/4.jpg",
    },
];

const Article: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    // Filter articles based on selected category
    const filteredArticles = selectedCategory === "Semua"
        ? articles
        : articles.filter(article => article.category === selectedCategory);

    return (
        <div className="p-8">
            {/* Breadcrumb Navigation */}
            <Breadcrumb className="mb-4">
                <Breadcrumb.Item>
                    <Link to="/">Beranda</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Artikel</Breadcrumb.Item>
            </Breadcrumb>

            {/* Title and Filter */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Artikel</h1>
                <Select
                    defaultValue="Semua"
                    className="w-32"
                    onChange={(value) => setSelectedCategory(value)}
                >
                    <Option value="Semua">Semua</Option>
                    <Option value="Eksplorasi">Eksplorasi</Option>
                    <Option value="Informasi">Informasi</Option>
                    <Option value="Persepsi">Persepsi</Option>
                </Select>
            </div>

            {/* Article Grid */}
            <Row gutter={[16, 16]}>
                {filteredArticles.map((article, index) => (
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
                                description={<div className="text-gray-500 text-xs">Publisher: {article.publisher}</div>}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Article;
