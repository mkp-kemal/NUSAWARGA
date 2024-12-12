import React from "react";

const Dashboard: React.FC = () => {
    return (
        <div className="w-full h-96 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-800 text-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4 md:text-5xl">Selamat Datang di Nusawarga</h1>
                <p className="text-md mb-6 md:text-lg">
                    Aplikasi postingan artikel/blog.
                </p>
                <a
                    href="/login"
                    className="bg-white text-indigo-600 font-bold px-6 py-2 rounded shadow-md hover:bg-gray-200 md:px-4 md:py-3"
                >
                    Silahkan Login
                </a>
            </div>
        </div>
    );
};

export default Dashboard;
