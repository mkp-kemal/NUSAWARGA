import React from "react";

const Dashboard: React.FC = () => {
    return (
        <div
            className="w-full h-96 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-800 text-white"
        >
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">Selamat Datang di Nusawarga</h1>
                <p className="text-lg mb-6">
                    Aplikasi postingan artikel/blog.
                </p>
                <a
                    href="/login"
                    className="bg-white text-indigo-600 font-bold px-6 py-3 rounded shadow-md hover:bg-gray-200"
                >
                    Silahkan Login
                </a>
            </div>
        </div>
    );
};

export default Dashboard;
