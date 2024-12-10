import React, { useState } from "react";
import { AppstoreAddOutlined, DashboardOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, Layout, Menu } from "antd";

const { Sider } = Layout;


interface SidebarProps {
    setCurrentSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setCurrentSection }) => {
    const [collapsed, setCollapsed] = useState(false);

    const onLogout = () => {
        document.cookie.split(";").forEach(cookie => {
            const name = cookie.split("=")[0].trim();
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });

        window.location.href = '/login';
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
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
                        label: <Link to="/admin" onClick={() => setCurrentSection('dashboard')} title="Halaman dashboard">Dashboard</Link>,
                    },
                    // {
                    //     key: "2",
                    //     icon: <UserOutlined />,
                    //     label: <Link to="/admin/users" title="Halaman pengelolaan user">Users</Link>,
                    // },
                    {
                        key: "2",
                        icon: <AppstoreAddOutlined />,
                        label: <a onClick={() => setCurrentSection('article')} title="Halaman tambah artikel">Tambah Artikel</a>,
                    },
                    {
                        type: 'divider',
                    },
                    {
                        key: "3",
                        icon: <LogoutOutlined style={{ color: 'red' }} />,
                        label: <a onClick={onLogout} title="Keluar dari aplikasi"><span className="text-red-600">Logout</span></a>,
                    },
                ]}
            />
        </Sider>
    );
};

export default Sidebar;