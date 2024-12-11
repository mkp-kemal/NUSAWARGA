import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-4">Oops! Halaman yang Anda cari tidak ditemukan.</p>
            <button
                onClick={handleBackHome}
                className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition-all"
            >
                Kembali ke Beranda
            </button>
        </div>
    );
};

export default NotFound;
