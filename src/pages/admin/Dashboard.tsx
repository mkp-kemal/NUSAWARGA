import React, { useState, useEffect } from "react";
import { Table, Layout, Button, Modal, Form, Input, DatePicker, Image, message, Row, Col, Card, notification, Spin } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import formatDateAdmin from "../../helpers/DateFormate";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import BaseURLAPI from "../../helpers/BaseUrl";

const { Content } = Layout;
const { confirm } = Modal;

const DashboardAdmin: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editArticleId, setEditArticleId] = useState<number | null>(null);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [editorValue, setEditorValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [blogCount, setBlogCount] = useState(0);
    const maxBlog = 100;
    const [loadingModal, setLoadingModal] = useState(false);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        await axios.get(BaseURLAPI('api/v1/blogs'))
            .then((response) => {
                setData(response.data);
                setLoading(false);
                setBlogCount(response.data.length);
            })
            .catch((error) => {
                notification.error({
                    message: "Gagal memuat blog",
                    description: error.response.data.message
                })
            });
    }

    const showModal = (editId?: number) => {
        if (editId) {
            const article = data.find((item) => item._id === editId);
            if (article) {
                setEditArticleId(editId);
                setIsEditMode(true);
                form.setFieldsValue({
                    publisher: article.publisher,
                    story: article.story,
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

    const handleUpdate = async () => {
        try {
            setLoadingModal(true);
            const values = await form.validateFields();
            const formData = {
                story: values.story,
                title: values.title,
                description: values.description,
                date: values.date.format("YYYY-MM-DD"),
                image: imageUrl,
            };

            if (isEditMode && editArticleId !== null) {
                await axios.put(BaseURLAPI(`api/v1/blog/${editArticleId}`), formData);
                message.success("Article updated successfully");

                setData((prevData) =>
                    prevData.map((item) => (item.key === editArticleId ? { ...item, ...formData } : item))
                );
            }

            setIsModalVisible(false);
            form.resetFields();
            setImageUrl("");
            fetchBlogs();
            setLoadingModal(false);
        } catch (error) {
            message.error("Failed to update article");
        }
    };

    // const handleImageChange = (info: any) => {
    //     setImageUrl(info.fileList);
    // };

    // const uploadButton = (
    //     <div>
    //         <Button icon={<AppstoreAddOutlined />} />
    //         <div className="ant-upload-text">Upload Image</div>
    //     </div>
    // );

    const handleTableChange = (pagination: any) => {
        setPagination({
            current: pagination.current,
            pageSize: pagination.pageSize,
        });
    };

    const paginatedData = data.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize);

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: (_: string, __: any, index: number) => (pagination.current - 1) * pagination.pageSize + index + 1,
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
            render: (text: string) => formatDateAdmin(text),
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
            title: 'Action',
            key: 'action',
            width: 100,
            render: (record: any) => (
                <div>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => showModal(record._id)}
                    >
                    </Button>
                    <Button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-2"
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => showDeleteConfirm(record._id)}
                    >
                    </Button>
                </div>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    const showDeleteConfirm = (id: string) => {
        confirm({
            title: 'Apakah Anda yakin ingin menghapus postingan ini?',
            icon: <ExclamationCircleOutlined />,
            content: 'Tindakan ini tidak dapat dibatalkan dan belum ada backup.',
            okText: 'Ya, hapus',
            okType: 'danger',
            cancelText: 'Tidak',
            onOk() {
                handleDelete(id);
            },
            onCancel() {
                notification.error({
                    message: 'Aksi dibatalkan!',
                    description: "Postingan tidak ada yang dihapus",
                });
            },
        });
    }

    const handleDelete = async (id: string) => {
        const token = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .find(cookie => cookie[0].trim() === 'jwt')?.[1];

        try {
            await axios.delete(`${BaseURLAPI('api/v1/blog')}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            message.success('Blog berhasil dihapus');
            setData(data.filter(blog => blog._id !== id));
            setBlogCount(blogCount - 1);
        } catch (error) {
            message.error('Gagal menghapus blog');
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Layout style={{ padding: "0 24px 24px" }}>
                <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
                    <>
                        <Row gutter={16} className="mb-6 p-4 rounded-lg">
                            <Col span={12}>
                                <Card title={<span className='text-white'>Jumlah Postingan</span>} bordered={false} className="p-4 bg-green-600 text-white font-bold shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                    {blogCount}
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title={<span className='text-white'>Maksimal Postingan</span>} bordered={false} className="p-4 bg-lime-900 text-white font-bold shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                    {maxBlog - blogCount}
                                </Card>
                            </Col>
                        </Row>
                        <div className="table-responsive">
                            <Table
                                columns={columns}
                                dataSource={paginatedData}
                                pagination={{
                                    current: pagination.current,
                                    pageSize: pagination.pageSize,
                                    total: data.length,
                                }}
                                onChange={handleTableChange}
                            />
                        </div>
                    </>

                    <Modal
                        title={isEditMode ? "Edit Postingan" : "Tambah Postingan"}
                        open={isModalVisible}
                        onOk={handleUpdate}
                        onCancel={handleCancel}
                        footer={[
                            <Form.Item>
                                {loadingModal ? (
                                    <Button type="primary" htmlType="submit" loading></Button>
                                ) : (
                                    <>
                                        <Button key="back" onClick={handleCancel}>
                                            Cancel
                                        </Button>,
                                        <Button key="submit" type="primary" onClick={handleUpdate}>
                                            Submit
                                        </Button>,
                                    </>
                                )}
                            </Form.Item>
                        ]}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            name="article_form"
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                name="story"
                                label="Ceritakan Lebih Detail"
                                rules={[{ required: true, message: 'Masukan cerita' }]}
                            >
                                <ReactQuill
                                    value={editorValue}
                                    onChange={setEditorValue}
                                    theme="snow"
                                    style={{ height: '300px' }}
                                    modules={{
                                        toolbar: [
                                            ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'code'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                        ],
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                            >
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
                                label="Tanggal"
                                name="date"
                                rules={[{ required: true, message: 'Masukan Tanggal Publish' }]}
                            >
                                <DatePicker format="YYYY-MM-DD" />
                            </Form.Item>

                            <Form.Item
                            >
                            </Form.Item>

                            {/* Upload Image */}
                            {/* <Form.Item name="image">
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    showUploadList={false}
                                    accept=".jpg,.jpeg,.png"
                                    beforeUpload={(file) => {
                                        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
                                        if (!isJpgOrPng) {
                                            message.error('Hanya file JPG, PNG, atau JPEG yang dapat diunggah!');
                                            return false;
                                        }

                                        const reader = new FileReader();
                                        
                                        reader.onload = () => setImageUrl(reader.result as string);
                                        reader.readAsDataURL(file);
                                        return false;
                                    }}
                                    onChange={handleImageChange}
                                >
                                    {imageUrl ? (
                                        <div>
                                            <img src={imageUrl} alt="image" className="w-full h-full rounded-lg" />
                                            <p className="text-xs italic text-gray-500">klik untuk mengganti gambar</p>
                                        </div>
                                    ) : uploadButton}
                                </Upload>
                            </Form.Item> */}
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardAdmin;
