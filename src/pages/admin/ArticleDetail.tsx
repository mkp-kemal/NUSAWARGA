import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Image, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaShareAltSquare } from 'react-icons/fa';
import { ImSpinner10 } from "react-icons/im";
import formatDateAdmin from '../../helpers/DateFormate';
import DOMPurify from 'dompurify';

const ArticleDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            axios.get(`http://localhost:3000/api/v1/blog/${id}`)
                .then((response) => {
                    setBlog(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    notification.error({
                        message: "Gagal memuat blog",
                        description: error.response.data.message
                    })
                });
        };

        fetchBlog();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                message.success('Link copied to clipboard!');
            })
            .catch(err => {
                console.error('Error copying text: ', err);
            });
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen mt-33">
                    <ImSpinner10 className="text-4xl animate-spin text-tosca" />
                </div>
            ) : (
                <>
                    <div className="container mx-auto py-8 px-4 fade-in">
                        <Button onClick={handleBack}>Kembali</Button>
                        <Button onClick={handleShare} style={{ marginLeft: '10px' }}><FaShareAltSquare />Share Link</Button>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
                            <div className="mb-4 flex justify-between">
                                <span className="text-sm text-gray-600">{formatDateAdmin(blog.date)}</span>
                                <p className="text-sm text-white font-semibold bg-tosca rounded-lg px-2">Author: {blog.publisher}</p>
                            </div>
                            <div className="mb-4">
                                <Image
                                    src={`${blog.image}`}
                                    alt="Blog"
                                    className="object-cover rounded-xl"
                                    width="100%"
                                    height={400}
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-xl text-gray-700 font-semibold">{blog.description}</p>
                            </div>
                            <div
                                className="text-gray-700 mt-10 custom-list custom-paragraph"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.story) }}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ArticleDetail;
