import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        checkSession();
    }, []);

    const onFinish = async (values: { username: string; password: string }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/login", values);

            if (response.status === 200) {
                const token = response.data.token;
                document.cookie = `jwt=${token}; path=/; max-age=${60 * 15}`;

                window.location.href = '/admin';
            } else {
                setError("Login failed");
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    const checkSession = async () => {
        const token = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .find(cookie => cookie[0].trim() === 'jwt')?.[1];
        try {
            const response = await axios.get('http://localhost:3000/api/v1/validate', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            });
            if (response.status === 200) {
                navigate('/admin');
            }
        } catch (error: any) {
            notification.info({
                message: 'Selamat datang di halaman login',
                description: error.response.data.message,
            });
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-slate-400">
            <Card className="w-full max-w-md p-8 shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <Form
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "Please input your Username!" }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please input your Password!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center mt-4">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <a href="#" className="text-blue-500">Forgot password?</a>
                </div>
            </Card>
        </div>
    );
};

export default Auth;
