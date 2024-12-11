import React from "react";
import { Form, Input, Button, Typography, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import BaseURLAPI from "../../helpers/BaseUrl";
import { useUser } from "../../helpers/UserContext";

const { Title } = Typography;

const AddArticle: React.FC = () => {
    const [form] = Form.useForm();
    const { user } = useUser();

    const onFinish = async (values: { title: string; description: string; date: any; image: any }) => {
        const formData = new FormData();

        formData.append("publisher", user ? user.name : "anonymous");
        formData.append("title", values.title as string);
        formData.append("description", values.description);
        formData.append("date", values.date ? values.date.format('YYYY-MM-DD') : "");

        if (values.image && values.image[0]) {
            formData.append("image", values.image[0].originFileObj);
        }

        try {
            const response = await axios.post(BaseURLAPI('api/v1/blog/post'), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            message.success("Article successfully added!");

            if (response.status === 201) {
                form.resetFields();
            }
        } catch (error) {
            message.error("Failed to add article.");
            console.error("Error:", error);
        }
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
                <Title level={3} className="text-center">
                    Tambah Blog
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="space-y-4"
                >
                    <Form.Item
                        label="Judul"
                        name="title"
                        rules={[{ required: true, message: "Please enter the article title" }]}
                    >
                        <Input placeholder="Enter article title" />
                    </Form.Item>

                    <Form.Item
                        label="Deskripsi"
                        name="description"
                        rules={[{ required: true, message: "Please enter the article description" }]}
                    >
                        <Input.TextArea placeholder="Enter article description" rows={3} />
                    </Form.Item>

                    <Form.Item
                        label="Tanggal Publish"
                        name="date"
                        initialValue={moment(new Date())}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            placeholder="Select article date"
                            format="DD MMMM YYYY"
                            defaultValue={moment(new Date())}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Gambar"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: "Please upload an image" }]}
                    >
                        <Upload
                            name="image"
                            listType="picture"
                            beforeUpload={() => false}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit Article
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AddArticle;
