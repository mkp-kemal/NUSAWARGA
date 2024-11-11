import React from "react";
import { Form, Input, Button, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: { username: string; password: string }) => {
        console.log("Success:", values);
        navigate("/admin");
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
                    <a href="#" className="text-blue-500">Forgot password?</a>
                </div>
            </Card>
        </div>
    );
};

export default Auth;
