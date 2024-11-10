import React, { useState } from "react";
import { Table, Layout, Menu, Button, Modal, Form, Input, DatePicker, Image, Upload, message, Row, Col, Card } from "antd";
import { AppstoreAddOutlined, UserOutlined, DashboardOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

const { Sider, Content } = Layout;

const DashboardAdmin: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState<any[]>([
        {
            key: 1,
            no: 1,
            publisher: "Publisher 1",
            title: "Artikel 1",
            description: "Deskripsi artikel 1",
            date: "2024-11-01",
            image: "https://via.placeholder.com/100",
        },
        {
            key: 2,
            no: 2,
            publisher: "Publisher 2",
            title: "Artikel 2",
            description: "Deskripsi artikel 2",
            date: "2024-11-02",
            image: "https://via.placeholder.com/100",
        },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editArticleId, setEditArticleId] = useState<number | null>(null);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string>("");

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const showModal = (editId?: number) => {
        if (editId) {
            const article = data.find((item) => item.key === editId);
            if (article) {
                setEditArticleId(editId);
                setIsEditMode(true);
                form.setFieldsValue({
                    publisher: article.publisher,
                    title: article.title,
                    description: article.description,
                    date: moment(article.date),
                    image: article.image,
                });
                setImageUrl(article.image);
            }
        } else {
            setIsEditMode(false);
            setEditArticleId(null);
            form.resetFields();
            setImageUrl("");
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                const newArticle = {
                    key: editArticleId || data.length + 1,
                    no: editArticleId || data.length + 1,
                    publisher: values.publisher,
                    title: values.title,
                    description: values.description,
                    date: values.date.format("YYYY-MM-DD"),
                    image: imageUrl || values.image,
                };

                if (isEditMode && editArticleId !== null) {
                    const updatedData = data.map((item) =>
                        item.key === editArticleId ? newArticle : item
                    );
                    setData(updatedData);
                    message.success("Artikel berhasil diperbarui!");
                } else {
                    setData([...data, newArticle]);
                    message.success("Artikel berhasil ditambahkan!");
                }
                form.resetFields();
                setImageUrl("");
                setIsModalVisible(false);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "Publisher",
            dataIndex: "publisher",
            key: "publisher",
        },
        {
            title: "Judul",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Deskripsi",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Tanggal",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Gambar",
            dataIndex: "image",
            key: "image",
            render: (text: string) => (
                <Image width={100} src={text} alt="Article Image" />
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (record: any) => (
                <span>
                    <Button type="link" onClick={() => showModal(record.key)}>Edit</Button>
                    <Button type="link" danger onClick={() => deleteArticle(record.key)}>Delete</Button>
                </span>
            ),
        },
    ];

    const deleteArticle = (key: any) => {
        setData(data.filter(item => item.key !== key));
        message.success("Artikel berhasil dihapus!");
    };

    const handleImageChange = (info: any) => {
        setImageUrl(info.fileList);
    };

    const uploadButton = (
        <div>
            <Button icon={<AppstoreAddOutlined />} />
            <div className="ant-upload-text">Upload Image</div>
        </div>
    );

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsed={collapsed} width={200} className="site-layout-background">
                <div className="w-full bg-white">
                    <Button type="primary" onClick={toggleCollapsed} className="m-4">
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                </div>
                <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}
                    items={[
                        {
                            key: "1",
                            icon: <DashboardOutlined />,
                            label: collapsed ? "" : <Link to="/">Dashboard</Link>,
                        },
                        {
                            key: "2",
                            icon: <UserOutlined />,
                            label: collapsed ? "" : <Link to="/users">Users</Link>,
                        },
                        {
                            key: "3",
                            icon: <AppstoreAddOutlined />,
                            label: collapsed ? "" : <Link to="/products">Products</Link>,
                        },
                        {
                            type: 'divider',
                        },
                        {
                            key: "4",
                            icon: <LogoutOutlined style={{ color: 'red' }} />,
                            label: collapsed ? "" : <a href="/logout"><span className="text-red-600">Logout</span></a>,
                        },
                    ]}
                />
            </Sider>

            <Layout style={{ padding: "0 24px 24px" }}>
                <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
                    <Row gutter={16} className="mb-6 p-4 rounded-lg">
                        <Col span={12}>
                            <Card title={<span className='text-white'>Jumlah Blog</span>} bordered={false} className="p-4 bg-green-600 text-white font-bold shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                34
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title={<span className='text-white'>Jumlah Admin</span>} bordered={false} className="p-4 bg-lime-900 text-white font-bold shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                34
                            </Card>
                        </Col>
                    </Row>

                    {/* Wrapper div to make table horizontally scrollable on smaller screens */}
                    <div className="table-responsive">
                        <Table columns={columns} dataSource={data} pagination={false} />
                    </div>

                    <Modal
                        title={isEditMode ? "Edit Article" : "Add New Article"}
                        open={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" onClick={handleOk}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            name="article_form"
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                name="publisher"
                                label="Publisher"
                                rules={[{ required: true, message: "Please input the publisher!" }]}
                            >
                                <Input placeholder="Enter publisher name" />
                            </Form.Item>

                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true, message: "Please input the article title!" }]}
                            >
                                <Input placeholder="Enter article title" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: "Please input the article description!" }]}
                            >
                                <Input.TextArea rows={4} placeholder="Enter article description" />
                            </Form.Item>

                            <Form.Item
                                name="date"
                                label="Date"
                                rules={[{ required: true, message: "Please select the date!" }]}
                            >
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Upload Image"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => e.fileList}
                            >
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    onChange={handleImageChange}
                                >
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="image" style={{ width: "100%" }} />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardAdmin;
