import React, { useEffect, useState } from "react";
import { Card, Col, Row, Breadcrumb, notification } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import formatDateAdmin from "../helpers/DateFormate";
import truncateText from "../helpers/Truncated";
import BaseURLAPI from "../helpers/BaseUrl";

const { Meta } = Card;

const Article: React.FC = () => {
    const [data, setData] = useState<any[]>([]);


    useEffect(() => {
        axios.get(BaseURLAPI('api/v1/blogs'))
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                notification.error({
                    message: "Gagal memuat blog",
                    description: error.response.data.message
                })
            });
    }, []);

    return (
        <div className="p-8">
            {/* Breadcrumb Navigation */}
            <Breadcrumb className="mb-4">
                <Breadcrumb.Item>
                    <Link to="/">Beranda</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Artikel</Breadcrumb.Item>
            </Breadcrumb>

            {/* Article Grid */}
            <Row gutter={[16, 16]}>
                {data.map((article, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card
                            hoverable
                            cover={<div className="bg-cover bg-center w-full h-48" style={{ backgroundImage: `url(${article.image})` }}></div>}
                            className="h-full"
                            onClick={() => window.location.href = `/article/${article._id}`}
                        >
                            <div className="text-gray-500 text-sm">{formatDateAdmin(article.date)}</div>
                            <Meta
                                title={<div className="text-lg font-semibold">{truncateText(article.title, 25)}</div>}
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
