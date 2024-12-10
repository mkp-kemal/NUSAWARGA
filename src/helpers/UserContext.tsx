import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import BaseURLAPI from '../helpers/BaseUrl';

interface User {
    name: string;
}

interface UserContextProps {
    user: User | null;
    loading: boolean;
}

const UserContext = createContext<UserContextProps>({
    user: null,
    loading: true,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = document.cookie
                .split(';')
                .map(cookie => cookie.split('='))
                .find(cookie => cookie[0].trim() === 'jwt')?.[1];
            try {
                const response = await axios.get(BaseURLAPI('api/v1/me'), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data);
            } catch (error) {
                console.error('Gagal memuat data user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
