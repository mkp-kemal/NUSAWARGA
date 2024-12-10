import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Image, message, notification, Spin } from 'antd';
import { FaShareAltSquare } from 'react-icons/fa';
import formatDateAdmin from '../../helpers/DateFormate';
import DOMPurify from 'dompurify';
import BaseURLAPI from '../../helpers/BaseUrl';
import { BsClockFill } from 'react-icons/bs';

const ArticleDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(BaseURLAPI(`api/v1/blog/${id}`));
                setBlog(response.data);
                setLoading(false);
            } catch (error: any) {
                notification.error({
                    message: 'Gagal memuat blog',
                    description: error?.response?.data?.message || 'Terjadi kesalahan!',
                });
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleBack = () => {
        window.history.back();
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                message.success('Link copied to clipboard!');
            })
            .catch((err) => {
                console.error('Error copying text: ', err);
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <Button onClick={handleBack}>Kembali</Button>
                <Button
                    type="primary"
                    icon={<FaShareAltSquare />}
                    onClick={handleShare}
                >
                    Share
                </Button>
            </div>

            {/* Layout Artikel */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Gambar */}
                <div className="flex-shrink-0">
                    <Image
                        src={blog?.image || 'https://via.placeholder.com/300'}
                        alt={blog?.title}
                        className="rounded-md border border-gray-300"
                        width={window.innerWidth < 768 ? '100%' : 300}
                        height={window.innerWidth < 768 ? '100%' : 300}
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                {/* Teks Artikel */}
                <div className="text-justify flex-1">
                    <div className="flex items-center text-sm text-blue-400 mb-4">
                        <BsClockFill className="mr-2" />
                        {
                            blog?.date && (
                                <span>
                                    {
                                        new Date().toDateString() === new Date(blog?.date).toDateString()
                                            ? 'Diposting hari ini'
                                            : `${formatDateAdmin(blog?.date)} (${Math.ceil(
                                                (new Date().getTime() - new Date(blog?.date).getTime()) / (1000 * 60 * 60 * 24)
                                            )} hari yang lalu)`
                                    }
                                </span>
                            )
                        }
                    </div>
                    <div
                        className="text-base leading-relaxed custom-list custom-paragraph"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blog?.story || ''),
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
