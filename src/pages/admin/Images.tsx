import { useEffect, useState } from "react";
import { Image, Row, Col, Card, Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { ImSpinner10 } from "react-icons/im";
import BaseURLAPI from "../../helpers/BaseUrl";

interface ImageData {
    name: string;
    url: string;
}

export const Images: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(BaseURLAPI('api/v1/images'));
                setImages(response.data);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const handleDelete = async (fileName: string) => {
        try {
            const response = await axios.delete(BaseURLAPI('api/v1/images'), {
                headers: { "Content-Type": "application/json" },
                data: { fileName },
            });

            if (response.status === 200) {
                message.success("Image deleted successfully");
                setImages((prevImages) => prevImages.filter((image) => image.name !== fileName));
            } else {
                message.error("Error deleting image");
            }
        } catch (error) {
            console.error("Error deleting image:", error);
            message.error("Error deleting image");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ImSpinner10 className="text-4xl animate-spin text-tosca" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">GCP Images</h1>
            <Row gutter={[16, 16]}>
                {images.map((image) => (
                    <Col key={image.name} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={
                                <Image
                                    src={image.url}
                                    alt={image.name}
                                    height={200}
                                    preview={{
                                        src: image.url,
                                    }}
                                />
                            }
                            actions={[
                                <Popconfirm
                                    key={image.name}
                                    title="Are you sure you want to delete this image?"
                                    onConfirm={() => handleDelete(image.name)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        type="link"
                                        icon={<DeleteOutlined />}
                                        danger
                                    >
                                        Delete
                                    </Button>
                                </Popconfirm>,
                            ]}
                        >
                            <Card.Meta title={`Image ${image.name}`} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
